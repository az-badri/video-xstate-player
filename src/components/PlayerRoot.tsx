import { useMachine } from '@xstate/react';
import { playerMachine } from '../PlayerMachine';
import VideoModal from './VideoModal';
import MiniPlayer from './MiniPlayer';
import { Button } from 'antd';
import { Play } from "lucide-react";


export const PlayerRoot = () =>  {
    const [state, send] = useMachine(playerMachine);

    return (
        <div style={{ padding: 24 }}>
            <h2>XState Видео Плеер</h2>

            <div style={{ display: 'flex', gap: 8 }}>
                <Button onClick={() => send({ type: 'OPEN_MODAL' })}>
                    <Play/>Открыть плеер
                </Button>
            </div>

            <VideoModal state={state} send={send} />
            <MiniPlayer state={state} send={send} context={state.context} />
        </div>
    );
}

export default PlayerRoot;