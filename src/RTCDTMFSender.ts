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
        //iOS native dtmf method accept duration and interToneGap in seconds, so we had to convert it to secs
        const dur =
            Platform.OS === "ios"
                ? (duration || DEFAULT_DURATION) / 1000
                : duration || DEFAULT_DURATION;
        const toneGap =
            Platform.OS === "ios"
                ? (interToneGap || DEFAULT_INTER_TONE_GAP) / 1000
                : interToneGap || DEFAULT_INTER_TONE_GAP;

        WebRTCModule.peerConnectionSendDTMF(
            tones,
            dur,
            toneGap < 30 ? 30 : toneGap,
            this._peerConnectionId
        );
    }
}
