import { setup } from 'xstate';

export const playerMachine = setup({}).createMachine({
    id: 'videoPlayer',

    context: {
        url: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
    },

    initial: 'idle',

    states: {
        idle: {
            on: {
                OPEN_MODAL: 'modal',
                OPEN_MINI: 'mini',
            },
        },

        modal: {
            initial: 'paused',

            on: {
                CLOSE_MODAL: 'idle',
                TO_MINI: 'mini',
            },

            states: {
                paused: {
                    on: { PLAY: 'playing' },
                },
                playing: {
                    on: {
                        PAUSE: 'paused',
                        BUFFER: 'buffering',
                    },
                },
                buffering: {
                    on: {
                        RESOLVE: 'playing',
                        PAUSE: 'paused',
                    },
                },
            },
        },

        mini: {
            initial: 'paused',

            on: {
                CLOSE_MINI: 'idle',
                TO_MODAL: 'modal',
            },

            states: {
                paused: {
                    on: { PLAY: 'playing' },
                },
                playing: {
                    on: {
                        PAUSE: 'paused',
                        BUFFER: 'buffering',
                    },
                },
                buffering: {
                    on: {
                        RESOLVE: 'playing',
                        PAUSE: 'paused',
                    },
                },
            },
        },
    },
});
