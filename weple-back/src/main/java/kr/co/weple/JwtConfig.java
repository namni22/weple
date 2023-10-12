package kr.co.weple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class JwtConfig {
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.httpBasic().disable() 			
				.csrf().disable().cors()		
				.and()							
				.authorizeHttpRequests()		
				.antMatchers(HttpMethod.POST,"/member/login","/member/join").permitAll() 
				.antMatchers(HttpMethod.POST,"/member/**","/board/insert","/board/contentImg").authenticated()
				.and()
				.sessionManagement()			
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilterBefore(new JwtFilter(secretKey, jwtUtil) 
						, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

}
