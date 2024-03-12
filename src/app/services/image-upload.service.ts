import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  static async uploadImg(file: any) {
    const CLOUD_NAME = "dpnevk8db"
    const UPLOAD_PRESET = "k0lgk29w"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    try {
      const formData = new FormData()
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('file', file)

      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
      })

      const imgUrl = await res.json()
      return imgUrl.url
    } catch (err) {
      console.error('Failed to upload', err)
      throw err
    }
  }
}
