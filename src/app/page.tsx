'use client'
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
} from "@stream-io/video-react-sdk";

// for livestreamview component 
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'; 

const apiKey = "mmhfdzb5evj2";
// this token should be generated individually for the user on sign-up or login (is a common JSON web token)
// this token is to control who can access to the call 
// should be getted from the Stream SDK 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aS1Hb25fSmlubiIsInVzZXJfaWQiOiJRdWktR29uX0ppbm4iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczNjUzNjgwOSwiZXhwIjoxNzM3MTQxNjA5fQ.KYW_tZ1H6AYdn6Pc-gdU8d5XtQfjqkE1Oksh-Yl8gMc";
const userId = "Qui-Gon_Jinn";
const callId = "XEy9p9volvGq";

const user: User = { id: userId, name: "Tutorial" };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

export default function Home() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
      </StreamCall>
    </StreamVideo>
  );
}

const LivestreamView = () => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const [firstParticipant] = useParticipants();
  
  return (
    <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
      <div>{isLive ? `Live: ${participantCount}`: `In Backstage`}</div>
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The host hasn't joined yet</div>
      )}
      <div style={{ display: 'flex', gap: '4px'}}>
        <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
          {isLive ? "Stop Live" : "Go Live"}
        </button>
        <button onClick={() => cam.toggle()}>
          {isCamEnabled ? "Disable camera" : "Enable camera"}
        </button>
        <button onClick={() => mic.toggle()}>
          {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>
      </div>
    </div>
  );
};
