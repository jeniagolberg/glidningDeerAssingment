import metadataServiceInstance from "./metadata.serivce"

type Room = unknown;

async function fetchMetadata( roomId: number ): Promise<Room> {
    return metadataServiceInstance.getMetaDataById(roomId);
}

export {
    Room,
    fetchMetadata
} 