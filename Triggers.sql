DELIMITER $$

CREATE TRIGGER trg_no_overlap
BEFORE INSERT ON Appointment
FOR EACH ROW
BEGIN
    DECLARE v_count INT;

    SELECT COUNT(*) INTO v_count
    FROM Appointment
    WHERE doctor_id = NEW.doctor_id
    AND appointment_date = NEW.appointment_date
    AND start_time < NEW.end_time
    AND end_time > NEW.start_time;

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor already has an appointment in this time slot';
    END IF;
END$$

DELIMITER ;