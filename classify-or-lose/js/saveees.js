import {config, a} from './config.js'

/** Manages the creation, movement and destruction of the objects to be saved. */
export default class Saveees {
    constructor(scene) {
        this.scene = scene;
        this.running = true;
        this.incomingSaveees = scene.add.group();
        this.setLevel(1);

        config.saveeeInfos.forEach(si =>
            scene.load.spritesheet(si[0], a(si[1]), {frameWidth: si[2], frameHeight: si[3]}));
    }

    create() {
        this.createSaveeeAfterDelay(1000);
    }

    createSaveeeAfterDelay(delay) {
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                if (this.running) {
                    this.addSaveee();
                    this.createSaveeeAfterDelay(Phaser.Math.Between(500, this.maxSaveeeCreationPeriodMs));
                }
            },
        });
    }

    /** Increases saveee creation frequency and movement speed as the level increases */
    setLevel(level) {
        function map(source, sourceMin, sourceMax, targetStart, targetEnd) {
            const sourceRange = sourceMax - sourceMin;
            const targetRange = targetEnd - targetStart;
            return ((source - sourceMin) / sourceRange) * targetRange + targetStart;
        }
        function mapLevel(targetStart, targetStop) {return map(level, 1, config.highestLevel, targetStart, targetStop);}

        this.saveeeToLosePlaceTimeMs = mapLevel(config.saveeeToLosePlaceTimeMs.max, config.saveeeToLosePlaceTimeMs.min);
        const range = config.maxSaveeeCreationPeriodRangeMs;
        this.maxSaveeeCreationPeriodMs = mapLevel(range.top, range.bottom);
    }

    /** Adds a randomly-chosen saveee from a randomly-chosen category and starts it moving toward the lose place */
    addSaveee() {
        const saveeeInfos = this.scene.saveeeInfoSubset();
        const saveeeKey = saveeeInfos[Phaser.Math.Between(0, saveeeInfos.length - 1)][0];
        const saveee = this.scene.add.sprite(this.scene.xPos(0), -50, saveeeKey);
        const frameIndex = Phaser.Math.Between(0, saveee.texture.frameTotal - 1 - 1);  // Ignore the base frame
        saveee.setFrame(frameIndex);
        this.incomingSaveees.add(saveee);
        saveee.setScale(2 / 3);
        saveee.movementTween = this.moveToLosePlace(saveee, this.saveeeToLosePlaceTimeMs,
            () => this.incomingSaveees.remove(saveee));
    }

    /**
     * Stops the first incoming saveee from its move toward the lose place, and moves it to the selected target, and
     * then if that is the wrong target, sends it to the lose place.
     * @param target the selected target
     */
    selectTarget(target) {
        const saveee = this.incomingSaveees.getFirstAlive();
        if (! saveee) return;

        if (saveee.movementTween) {
            saveee.movementTween.stop();
            saveee.movementTween = undefined;
        }
        this.incomingSaveees.remove(saveee);

        this.scene.tweens.add({
            targets: [saveee], x: target.x, y: target.y, duration: 1000,
            onComplete: () => {
                if (saveee.texture.key === target.getData('targetName')) {
                    this.scene.text.addSorted();
                    saveee.destroy();
                } else {
                    this.moveToLosePlace(saveee);
                }
            }
        });
    }

    moveToLosePlace(saveee, duration=1000, onCompleteCallback) {
        const lpSprite = this.scene.losePlace.losePlaceSprite;
        return this.scene.tweens.add({
            targets: [saveee], x: lpSprite.x, y: lpSprite.y, duration: duration,
            onComplete: () => {
                if (onCompleteCallback) onCompleteCallback();
                this.lose(saveee)
            }
        });
    }

    lose(saveee) {
        this.scene.losePlace.lose();
        this.scene.tweens.add({
            targets: [saveee], alpha: 0, duration: 500,
            onComplete: () => {
                saveee.destroy();
                this.scene.text.addLost();
            }
        });
    }

    stop() {
        this.running = false;
    }
}
