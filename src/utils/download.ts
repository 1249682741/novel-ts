import JSZip from 'jszip'
import FileSaver from 'file-saver'

interface FileInfo {
  name?: string;
  imgData?: ArrayBuffer;
}

/**
 * 将图片打包下载
 * @param imgDataPromise Promise数组 imgDatePromise[0] 是封面图片信息， 其余为证书图片信息
 * @param coverImgName 封面图片命名
 * @param certificateImgName 证书图片命名
 */
export const toZipDownload = (imgDataPromise: Array<Promise<FileInfo>>, coverImgName: string, certificateImgName: string) => {
  const zip = new JSZip()
  Promise.all(imgDataPromise).then((res: Array<FileInfo>) => {
    const coverImgData = res.splice(0,1)[0].imgData
    res.forEach(item => {
      zip
        .folder(item.name)
        .file(coverImgName, coverImgData, {base64: true})
        .file(certificateImgName, item.imgData, {base64: true})
    })

    zip.generateAsync({type: 'blob'}).then(content => {
      FileSaver.saveAs(content, 'certificate.zip')
    })
  })
}