import { Injectable } from '@angular/core';
import {Http,URLSearchParams} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeURL:string="https://www.googleapis.com/youtube/v3/";
  private apiKey:string; //Darle el valor de la clave API dada por Youtube a la aplicacion
  private playListId:string; //Darle el valor de la playlist a cargar
  private nextPageToken:string="";

  constructor(public http:Http) { }

  getVideos(){
    let url=`${this.youtubeURL}playlistItems`;

    let params=new URLSearchParams();

    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId',this.playListId);
    params.set('key',this.apiKey);

    if(this.nextPageToken){
      params.set('pageToken',this.nextPageToken);
    }

    return this.http.get(url,{search:params})
            .map(res=>{

              this.nextPageToken=res.json().nextPageToken;

              let videos:any[]=[];

              for(let video of res.json().items){
                let snippet=video.snippet;

                videos.push(snippet);
              }

              return videos;
            });
  }
}
