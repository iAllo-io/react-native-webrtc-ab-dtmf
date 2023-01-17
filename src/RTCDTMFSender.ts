import { NativeModules, Platform } from "react-native";

const { WebRTCModule } = NativeModules;
const DEFAULT_DURATION = 300;
const DEFAULT_INTER_TONE_GAP = 70;

export default class RTCDTMFSender {
    _peerConnectionId: number;
    constructor(peerConnectionId: number) {
        this._peerConnectionId = peerConnectionId;
    }

    get canInsertDTMF() {
        return !!this._peerConnectionId;
    }

    insertDTMF(tones: string, duration?: number, interToneGap?: number) {
        const dur = duration || DEFAULT_DURATION;
        const toneGap = interToneGap || DEFAULT_INTER_TONE_GAP;
        WebRTCModule.peerConnectionSendDTMF(
            tones,
            dur,
            toneGap < 30 ? 30 : toneGap,
            this._peerConnectionId
        );
    }
}
