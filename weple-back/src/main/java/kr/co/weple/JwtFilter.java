package kr.co.weple;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	
	private String secretKey;
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
		//System.out.println("filter/auth : " + auth);
		// 1. 인증 토큰 없거나 잘못보낸 경우
		if(auth == null || !auth.startsWith("Bearer ")) {
			//System.out.println("인증이 없거나, 잘못됨");
			filterChain.doFilter(request, response);
			return;
		}
		// token값만 꺼냄
		String token = auth.split(" ")[1];
		System.out.println("filter/token : " + token);
		
		// 2. 정상이나 만료된 경우
		if(jwtUtil.isExpired(token, secretKey)) {
			System.out.println("인증 시간 만료");
			filterChain.doFilter(request, response);
			return;
		}
		
		// 3. 아이디를 꺼내서 컨트롤러로 전달
		String memberId = jwtUtil.getMemberId(token, secretKey);
		System.out.println("filter/memberId : " + memberId);
		request.setAttribute("memberId", memberId);
		
		// 허가 코드
		ArrayList<SimpleGrantedAuthority> list = new ArrayList<SimpleGrantedAuthority>();
		list.add(new SimpleGrantedAuthority("USER"));
		
		// 회원 등급 부여 및 암호화 토큰 생성
		UsernamePasswordAuthenticationToken authToken
		= new UsernamePasswordAuthenticationToken(memberId, null, list);
		
		authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		SecurityContextHolder.getContext().setAuthentication(authToken);
		
		filterChain.doFilter(request, response);
		
	}

}
