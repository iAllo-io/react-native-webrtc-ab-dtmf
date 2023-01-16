import { NativeModules } from 'react-native';

const { WebRTCModule } = NativeModules;
const DEFAULT_DURATION=300;
const DEFAULT_INTER_TONE_GAP=70

export default class RTCDTMFSender {
   
    _peerConnectionId: number;
    constructor(peerConnectionId: number) {
        this._peerConnectionId = peerConnectionId;
    }

   get canInsertDTMF(){
    return !!this._peerConnectionId
   }

   insertDTMF(tones: string, duration?: number, interToneGap?: number){
    WebRTCModule.peerConnectionSendDTMF(tones, duration || DEFAULT_DURATION,
    ((interToneGap || DEFAULT_INTER_TONE_GAP) < 30) ? 30 : (interToneGap || DEFAULT_INTER_TONE_GAP),
    this._peerConnectionId)
   }
  
}
