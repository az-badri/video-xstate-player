import { Modal, Button } from 'antd';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { Minimize2, Play, Pause } from "lucide-react";

export const VideoModal = ({ state, send }) => {
    const isModal = state.matches('modal');
    const isPlaying = state.matches({ modal: 'playing' });

    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        if (isModal) setShowPlayer(true);
    }, [isModal]);

    return (
        <Modal
            open={isModal}
            title="Video Player"
            onCancel={() => send({ type: 'CLOSE_MODAL' })}
            footer={[
                <Button key="mini" onClick={() => send({ type: 'TO_MINI' })}>
                    <Minimize2/>
                </Button>,
                <Button
                    key="playpause"
                    onClick={(e) => {
                        e.currentTarget.blur();
                        send({ type: isPlaying ? 'PAUSE' : 'PLAY' })
                    }}
                >
                    {isPlaying ? <Pause/> : <Play/>}
                </Button>
            ]}

            width={800}
        >
            <div style={{ position: 'relative', paddingTop: '50%' }}>
                {showPlayer && (
                    <ReactPlayer
                        url={state.context.url}
                        playing={isPlaying}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        onBuffer={() => send({ type: 'BUFFER' })}
                        onReady={() => send({ type: 'RESOLVE' })}
                        config={{
                            file: { forceHLS: true },
                        }}
                    />
                )}
            </div>
        </Modal>
    );
};

export default VideoModal;
