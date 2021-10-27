package xyz.sudocat.ipldashboard.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import xyz.sudocat.ipldashboard.model.Match;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String team1, String team2, Pageable pageable);

    @Query("SELECT m from Match m WHERE (m.team1 = :teamName or m.team2 = :teamName) AND (m.date BETWEEN :startDate AND :endDate) ORDER BY date DESC")
    List<Match> getMatchesByTeamBetweenDates(
            @Param("teamName") String teamName, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
//    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
//            String team1, LocalDate startDate1, LocalDate endDate1,
//            String team2, LocalDate startDate2, LocalDate endDate2);

    default List<Match> findLatestMatchesByTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
