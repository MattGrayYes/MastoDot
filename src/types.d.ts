export interface Toot {
    account: {
        display_name: string,
        acct: string
    },
    content: string,
    media_attachments: MediaAttachment[],
    created_at: string,
    poll: boolean
}

export interface MediaAttachment {
    type: string,
    description: string,
    preview_url: string
}