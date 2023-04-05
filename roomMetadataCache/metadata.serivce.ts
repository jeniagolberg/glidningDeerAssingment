

import { Room } from "./index"

declare function readMetadataFromDb( roomId: number) : Promise<Room> ; 

class MetadataService { 

    static instance: MetadataService;

    private cachedMetadataMap: Map<number, Room>;

    private roomsBeingFetched: Map<number, Promise<Room>>;


    static getInstance = () => {
        if(!MetadataService.instance){ 
            MetadataService.instance = new MetadataService()
        }

        return MetadataService.instance
    }

    //outbound facing function
    public async getMetaDataById(roomId: number) {

        if(this.roomsBeingFetched.get(roomId)){
            // the room is being fetch and will be avalible in the cache
            await this.roomsBeingFetched.get(roomId);
        }

        const cachedMetadata = this.cachedMetadataMap.get(roomId);
        if (cachedMetadata) {
            return cachedMetadata;
        }

        return this.preformFetchAndSave(roomId)
    }

    //responsible for managing the first time we request a specific room.
    private async preformFetchAndSave(roomId: number): Promise<Room> {

       // set the room as being fetched
       this.roomsBeingFetched.set(roomId, this.helper(roomId) )

       //await the completion of the promise
       const res = await this.roomsBeingFetched.get(roomId)

       //remove from the wait map
       this.roomsBeingFetched.delete(roomId);
       
       //return from cache, since helper promise finished and saved it
       return this.cachedMetadataMap.get(roomId)
    }

    private async helper(roomId: number ){ 
        try {
            const res = await readMetadataFromDb(roomId);
            this.cachedMetadataMap.set(roomId, res);
            return res;
          } catch (err) {
            throw err;
          }
    }


}

export default MetadataService.getInstance();