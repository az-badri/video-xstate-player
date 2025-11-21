import { createMachine } from 'xstate';

export const playerMachine = createMachine({
        id: 'videoPlayer',
        initial: 'idle',
        context: {
            url: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
            lastTime: 0
        },
        states: {
            idle: {
                on: {
                    OPEN_MODAL: 'modal.open',
                    TOGGLE_MINI: 'mini.closed'
                }
            },
            modal: {
                initial: 'closed',
                states: {
                    closed: {
                        on: { OPEN: 'open' }
                    },
                    open: {
                        entry: ['focusPlayer'],
                        on: {
                            PLAY: 'playing',
                            CLOSE: 'closed',
                            TO_MINI: '#videoPlayer.mini.open'
                        },
                        states: {
                            paused: { on: { PLAY: 'playing' } },
                            playing: {
                                on: {
                                    PAUSE: 'paused',
                                    BUFFER: 'buffering'
                                }
                            },
                            buffering: { on: { RESOLVE: 'playing', PAUSE: 'paused' } }
                        }
                    }
                }
            },
            mini: {
                initial: 'closed',
                states: {
                    closed: {
                        on: { OPEN_MINI: 'open' }
                    },
                    open: {
                        on: {
                            PLAY: 'playing',
                            PAUSE: 'paused',
                            CLOSE_MINI: 'closed',
                            OPEN_MODAL: 'closed'
                        },
                        states: {
                            paused: { on: { PLAY: 'playing' } },
                            playing: {
                                on: {
                                    PAUSE: 'paused',
                                    BUFFER: 'buffering'
                                }
                            },
                            buffering: { on: { RESOLVE: 'playing', PAUSE: 'paused' } }
                        }
                    }
                }
            }
        }
    },
    {
        actions: {
            focusPlayer: () => {}
        }
    });
