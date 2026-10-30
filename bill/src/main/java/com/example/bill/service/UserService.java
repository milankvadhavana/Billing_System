
package com.example.bill.service;

import com.example.bill.dto.AuthResponse;
import com.example.bill.dto.LoginRequest;
import com.example.bill.dto.RegisterRequest;
import com.example.bill.model.User;
import com.example.bill.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setPhone(req.getPhone());

        User saved = userRepository.save(user);

        return new AuthResponse(
                "Registration successful",
                String.valueOf(saved.getId()),
                saved.getName(),
                saved.getEmail()
        );
    }

    public AuthResponse login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(
                "Login successful",
                String.valueOf(user.getId()),
                user.getName(),
                user.getEmail()
        );
    }
}
