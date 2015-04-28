package sxq.demo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@Controller
@RequestMapping("/")
public class FileuploadController {
	
	@RequestMapping({"/","/index"})
	public String index(){
		return "index";
	}
	@RequestMapping("/doFileupload")
	public String doFileupload(HttpServletRequest request,String fileName) throws Exception{
		MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = mRequest.getFileMap();
		
		for (Iterator<Map.Entry<String, MultipartFile>> it = fileMap.entrySet()
				.iterator(); it.hasNext();) {
			// 固定参数值对
			Map.Entry<String, MultipartFile> entry = it.next();
			MultipartFile mFile = entry.getValue();
			System.out.println(mFile.getSize());
			File file = new File("F://"+ fileName.toLowerCase());
			OutputStream outputStream = null;
			RandomAccessFile raFile = null;
			InputStream in = mFile.getInputStream();
			try{
				if(file.exists()){
					raFile = new RandomAccessFile(file, "rw");
					raFile.seek(file.length());
					byte[] buffer = new byte[4096];
					int bytesRead = -1;
					while ((bytesRead = in.read(buffer)) != -1) {
						raFile.write(buffer, 0, bytesRead);
					}
				}else{
					outputStream = new FileOutputStream(file);
					FileCopyUtils.copy(in, outputStream);
					outputStream.close();
				}
			}finally{
				if(outputStream != null) {
					outputStream.close();
				}
				if(raFile != null) {
					raFile.close();
				}
			}
		}
		return "index";
	}
	/**
	 * 得到本地文件的长度
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getLocalFileSize")
	public long	getLocalFileSize(String fileName){
		try{
			File file = new File("F://"+fileName.toLowerCase());
			return file.length();
		}catch(Exception e){
			return 0l;
		}
	}
}
