package kr.co.weple;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	public String createToken(String memberId, String secretKey, long expiredMs) {
		Claims claims = Jwts.claims();
		claims.put("memberId", memberId);
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+expiredMs))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	
	// 토큰 만료되었는지 체크하는 메소드
	public boolean isExpired(String token, String secretKey) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody().getExpiration().before(new Date());
	}
	
	// 토큰 정보 이용해 로그인 한 회원 아이디 추출
	public String getMemberId(String token, String secretKey) {
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		return Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody().get("memberId",String.class);
	}
}
