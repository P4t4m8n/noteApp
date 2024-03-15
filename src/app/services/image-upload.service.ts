import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private readonly CLOUD_NAME = "dpnevk8db"
  private readonly UPLOAD_PRESET = "k0lgk29w"
  private readonly UPLOAD_URL = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`

  constructor(private http: HttpClient) { }

  uploadImg(file: any): Observable<string> {
    const formData = new FormData()
    formData.append('upload_preset', this.UPLOAD_PRESET)
    formData.append('file', file)

    return this.http.post<any>(this.UPLOAD_URL, formData).pipe(
      map(response => response.url)
    )
  }
}
