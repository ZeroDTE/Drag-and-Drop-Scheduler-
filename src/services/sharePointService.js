// src/services/sharePointService.js

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

class SharePointService {
  async saveSchedule(scheduleData) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/schedule/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toLocaleString(),
          schedule: scheduleData.schedule,
          sickEmployees: scheduleData.sickEmployees,
          vacationEmployees: scheduleData.vacationEmployees,
          comingLaterEmployees: scheduleData.comingLaterEmployees
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save schedule');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Save schedule error:', error);
      // Fallback to localStorage if SharePoint fails
      this.saveToLocalStorage(scheduleData);
      throw error;
    }
  }

  async getSchedules() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/schedule/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      return await response.json();
    } catch (error) {
      console.error('Get schedules error:', error);
      // Fallback to localStorage if SharePoint fails
      return this.getFromLocalStorage();
    }
  }

  async deleteSchedule(scheduleId) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/schedule/${scheduleId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }
      return await response.json();
    } catch (error) {
      console.error('Delete schedule error:', error);
      throw error;
    }
  }

  // Fallback methods for localStorage
  saveToLocalStorage(scheduleData) {
    try {
      const savedSchedules = JSON.parse(localStorage.getItem('savedSchedules') || '[]');
      const newSchedule = {
        id: Date.now(),
        ...scheduleData
      };
      savedSchedules.push(newSchedule);
      localStorage.setItem('savedSchedules', JSON.stringify(savedSchedules));
      return newSchedule;
    } catch (error) {
      console.error('LocalStorage save error:', error);
    }
  }

  getFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem('savedSchedules') || '[]');
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return [];
    }
  }
}

export default new SharePointService();