import { Howl, Howler } from 'howler';

class AudioController {
    constructor() {
        this.bgm = null;
        this.currentSceneId = null;
        this.isMuted = false;
        this.volume = 0.5;
        this.sfx = {
            click: new Howl({ src: ['/assets/audio/sfx_choice_click.mp3'] }),
            confirm: new Howl({ src: ['/assets/audio/sfx_choice_confirm.mp3'] }),
            success: new Howl({ src: ['/assets/audio/sfx_success.mp3'] }),
            fail: new Howl({ src: ['/assets/audio/sfx_fail.mp3'] })
        };
    }

    playSceneBgm(sceneId) {
        let bgmFile = this.getBgmFileForScene(sceneId);
        const newSrc = `/assets/audio/${bgmFile}`;

        // Don't restart if already playing the same file
        if (this.bgm && this.bgm._src === newSrc && this.bgm.playing()) {
            return;
        }

        // If a different BGM is playing, fade it out
        if (this.bgm) {
            this.bgm.fade(this.bgm.volume(), 0, 1500);
            const oldBgm = this.bgm;
            setTimeout(() => {
                oldBgm.stop();
                oldBgm.unload();
            }, 1600);
        }

        this.bgm = new Howl({
            src: [newSrc],
            loop: true,
            volume: 0,
            html5: true, // Crucial for performance and long files
            onloaderror: (e) => console.error('Audio load error:', e)
        });

        if (!this.isMuted) {
            this.bgm.play();
            this.bgm.fade(0, this.volume, 1000);
        } else {
            this.bgm.volume(0);
        }
    }

    getBgmFileForScene(sceneId) {
        // User requested hanoi_vivu.mp3 for all scenes during gameplay
        return 'hanoi_vivu.mp3';
    }

    playSfx(type) {
        if (this.sfx[type]) {
            this.sfx[type].play();
        }
    }

    setMute(mute) {
        this.isMuted = mute;
        Howler.mute(mute);
        
        // Ensure BGM volume is also 0 for consistency
        if (this.bgm) {
            if (mute) {
                this.bgm.volume(0);
                this.bgm.pause(); // Be aggressive
            } else {
                this.bgm.volume(this.volume);
                this.bgm.play();
            }
        }
    }

    setVolume(vol) {
        this.volume = vol;
        if (this.bgm && !this.isMuted) {
            this.bgm.volume(vol);
        }
    }
}

const instance = new AudioController();
export default instance;
