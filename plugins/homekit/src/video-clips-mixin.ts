import sdk, { FFMpegInput, MediaObject, MixinDeviceBase, MixinDeviceOptions, VideoCamera, VideoClip, VideoClipOptions, VideoClips } from "@scrypted/sdk";
import fs from 'fs';
import { getCameraRecordingFiles, getVideoClip, getVideoClips, getVideoClipThumbnail, parseHksvId, removeVideoClip } from "./types/camera/camera-recording-files";

const { mediaManager } = sdk;

export class ClipsMixin extends MixinDeviceBase<VideoCamera> implements VideoClips {
    constructor(options: MixinDeviceOptions<VideoCamera>) {
        super(options);
    }

    async getVideoClips(options?: VideoClipOptions): Promise<VideoClip[]> {
        return getVideoClips(options, this.id);
    }

    async getVideoClip(videoClipId: string): Promise<MediaObject> {
        // should filter by id here
        return getVideoClip(videoClipId);
    }

    async getVideoClipThumbnail(videoClipId: string): Promise<MediaObject> {
        // should filter by id here
        return getVideoClipThumbnail(videoClipId);
    }

    async removeVideoClips(...videoClipIds: string[]): Promise<void> {
        if (!videoClipIds.length) {
            const allClips = await getVideoClips(undefined, this.id);
            videoClipIds = allClips.map(clip => clip.id);
        }
        for (const id of videoClipIds) {
            removeVideoClip(id);
        }
    }
}
