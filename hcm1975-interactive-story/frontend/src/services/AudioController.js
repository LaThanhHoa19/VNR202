import { Howl } from 'howler';

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
        if (this.currentSceneId === sceneId) return;

        // Map sceneId to mood/category or specific file
        let bgmFile = this.getBgmFileForScene(sceneId);
        
        if (this.bgm) {
            this.bgm.fade(this.volume, 0, 1000);
            const oldBgm = this.bgm;
            setTimeout(() => oldBgm.stop(), 1000);
        }

        this.bgm = new Howl({
            src: [`/assets/audio/${bgmFile}`],
            loop: true,
            volume: 0,
            html5: true // Better for long files
        });

        this.bgm.play();
        this.bgm.fade(0, this.volume, 1000);
        this.currentSceneId = sceneId;
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
        const vol = mute ? 0 : this.volume;
        if (this.bgm) {
            this.bgm.fade(this.bgm.volume(), vol, 500);
        }
    }

    setVolume(vol) {
        this.volume = vol;
        if (this.bgm) {
            this.bgm.volume(vol);
        }
    }
}

const instance = new AudioController();
export default instance;
