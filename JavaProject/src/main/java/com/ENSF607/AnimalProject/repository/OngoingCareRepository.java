package com.ENSF607.AnimalProject.repository;

import com.ENSF607.AnimalProject.model.OngoingCare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Component
@Repository
public interface OngoingCareRepository extends JpaRepository<OngoingCare, Long>{
    List<OngoingCare> findByanimalid(Long animalid);
}
