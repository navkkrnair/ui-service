package com.ams.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class UiServiceApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(UiServiceApplication.class,
                              args);
    }

    @GetMapping(value = "/{path:[^\\.]*}")
    public String redirect()
    {
        return "forward:/";
    }

    @Configuration
    @Order(1)
    protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter
    {
        @Override
        protected void configure(HttpSecurity http) throws Exception
        {
            http.sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.NEVER);
            http.authorizeRequests()
                    .antMatchers("/index.html",
                                 "/")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                    .and()
                    .httpBasic();
        }

        @Override
        public void configure(WebSecurity web) throws Exception
        {
            web.ignoring()
                    .antMatchers("*.bundle.*",
                                 "*.js");
        }
    }

}
