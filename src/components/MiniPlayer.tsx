import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'antd';

export const MiniPlayer = ({ state, send, context }) => {
    const isMini = state.matches('mini');
    if (!isMini) return null;

    const isPlaying = state.matches({ mini: 'playing' });

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                height: 230,
                background: 'white',
                borderRadius: 8,
                overflow: 'hidden',
                padding: 8,
                zIndex: 2000,
            }}
        >
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <ReactPlayer
                    url={context.url}
                    playing={isPlaying}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    onBuffer={() => send({ type: 'BUFFER' })}
                    onReady={() => send({ type: 'RESOLVE' })}
                    config={{ file: { forceHLS: true } }}
                />
            </div>

            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" onClick={() => send({ type: isPlaying ? 'PAUSE' : 'PLAY' })}>
                    {isPlaying ? 'Пауза' : 'Играть'}
                </Button>
                <Button size="small" onClick={() => send({ type: 'TO_MODAL' })}>
                    Увеличить
                </Button>
                <Button size="small" onClick={() => send({ type: 'CLOSE_MINI' })}>
                    Закрыть
                </Button>
            </div>
        </div>
    );
}

export default MiniPlayer;