package com.ssm.tpssystem.service;

import com.ssm.tpssystem.domain.Client;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {
    public List<Client> findAllClient();
}
