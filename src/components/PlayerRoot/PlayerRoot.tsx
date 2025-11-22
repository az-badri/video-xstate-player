import { useMachine } from '@xstate/react';
import { playerMachine } from '../../PlayerMachine';
import VideoModal from '../VideoModal/VideoModal';
import MiniPlayer from '../MiniPlayer/MiniPlayer';
import { Button } from 'antd';
import { Play } from "lucide-react";

import './PlayerRoot.scss';

export const PlayerRoot = () =>  {
    const [state, send] = useMachine(playerMachine);

    return (
        <div className="player-root">
            <h2 className="player-title">XState Видео Плеер</h2>

            <div className="player-actions">
                <Button
                    className="player-btn"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        send({ type: 'OPEN_MODAL' });
                    }}
                >
                    <Play className="icon" />
                    Открыть плеер
                </Button>
            </div>

            <VideoModal state={state} send={send} />
            <MiniPlayer state={state} send={send} context={state.context} />
        </div>
    );
};

export default PlayerRoot;
