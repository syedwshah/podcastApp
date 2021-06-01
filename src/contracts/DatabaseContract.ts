import {PodcastModel} from '../models/PodcastModel';

export interface IDatabaseContract {
  isReady: boolean;
  getAllPodcast(): Promise<PodcastModel[]>;
  subscribeToPodcast(podcast: PodcastModel): Promise<void>;
}
