package kr.co.weple;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUtil {
	public String getFilepath(String savepath, String filename, MultipartFile uploadFile) {
		
		String onlyFilename = filename.substring(0, filename.lastIndexOf("."));
		String extention = filename.substring(filename.lastIndexOf("."));
		String filepath = null;
		int count = 0;
		while(true) {
			if(count == 0) {
				filepath = onlyFilename+extention;
			}else {
				filepath = onlyFilename+"_"+count+extention;
			}			
			File checkFile = new File(savepath+filepath);
			if(!checkFile.exists()) {
				try {
					uploadFile.transferTo(checkFile);
				} catch (IllegalStateException | IOException e) {					
					e.printStackTrace();
				}
				break;
			}
			count++;
		}
		return filepath;		
	}	
}
