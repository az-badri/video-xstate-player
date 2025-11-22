import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'antd';
import { Expand, Pause, Play, X as Exit } from "lucide-react";

import "./MiniPlayer.scss";

export const MiniPlayer = ({ state, send, context }) => {
    const isMini = state.matches('mini');
    if (!isMini) return null;

    const isPlaying = state.matches({ mini: 'playing' });

    return (
        <div className="mini-player">
            <div className="mini-player__video-wrapper">
                <ReactPlayer
                    url={context.url}
                    playing={isPlaying}
                    width="100%"
                    height="100%"
                    className="mini-player__video"
                    onBuffer={() => send({ type: 'BUFFER' })}
                    onReady={() => send({ type: 'RESOLVE' })}
                    config={{ file: { forceHLS: true } }}
                />
            </div>

            <div className="mini-player__controls">
                <Button
                    size="small"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        send({ type: isPlaying ? 'PAUSE' : 'PLAY' })
                    }}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </Button>

                <Button
                    size="small"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        send({ type: 'TO_MODAL' });
                    }}
                >
                    <Expand />
                </Button>

                <Button
                    size="small"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        send({ type: 'CLOSE_MINI' });
                    }}
                >
                    <Exit />
                </Button>
            </div>
        </div>
    );
};

export default MiniPlayer;
