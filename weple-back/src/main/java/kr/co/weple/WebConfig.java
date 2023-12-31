package kr.co.weple;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.annotation.Bean;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/feed/**")
		.addResourceLocations("file:///c:/Temp/weple/feed/");
		registry.addResourceHandler("/review/**")
		.addResourceLocations("file:///c:/Temp/weple/review/");
		registry.addResourceHandler("/member/**").addResourceLocations("file:///C:/Temp/weple/member/");
		registry.addResourceHandler("/board/**").addResourceLocations("file:///C:/Temp/weple/board/");
		registry.addResourceHandler("/meet/**").addResourceLocations("file:///C:/Temp/weple/meet/");
		registry.addResourceHandler("/meet/editor/**").addResourceLocations("file:///C:/Temp/weple/meet/editor/");
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}

