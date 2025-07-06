package com.developer.journal.configs;

import com.developer.journal.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .cors(cors->cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf-> csrf
                        .disable())
                .authorizeHttpRequests(requests-> requests
                        .requestMatchers("/api/**")
                        .authenticated()
                        .anyRequest().permitAll())
                .formLogin(login->login
                        .loginPage("/login")
                        .permitAll())
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // Allow H2 Console in same origin frame
                )
                .sessionManagement(config-> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider authProvider= new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration= new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET","POST","PUT","OPTIONS","DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(List<AuthenticationProvider> authenticationProviders){
        return new ProviderManager(authenticationProviders);
    }
}
