import React, { useState, useEffect, useRef } from 'react';
import sharePointService from './services/sharePointService';

const initialTasks = [
  'Wareneingang', 'Kommissionierung', 'Verpackung', 'Qualitätskontrolle',
  'Inventur', 'Versand', 'Retouren', 'Lageroptimierung', 'Wiege-Crew',
  'Aktive_Aufsicht', 'Pause', 'Palletierer', 'Lagercheck', 'Sonderaufgabe',
  'Lagerleitung', 'Landside', 'Airside', 'LKW-Beladerer', 'Annahme',
  'Schulung', 'Sauberkeit', 'Wiege-Crew', 'Auslieferung', 'supervision',
  'Ganze Abfert'
];

const allEmployees = [
  'Mitarbeiter 1', 'Mitarbeiter 2', 'Mitarbeiter 3', 'Mitarbeiter 4', 'Mitarbeiter 5', 'Mitarbeiter 6', 'Mitarbeiter 7', 'Mitarbeiter 8', 'Mitarbeiter 9', 'Mitarbeiter 10', 'Mitarbeiter 11', 'Mitarbeiter 12', 'Mitarbeiter 13', 'Mitarbeiter 14', 'Mitarbeiter 15', 'Mitarbeiter 16', 'Mitarbeiter 17', 'Mitarbeiter 18', 'Mitarbeiter 19', 'Mitarbeiter 20', 'Mitarbeiter 21', 'Mitarbeiter 22', 'Mitarbeiter 23', 'Mitarbeiter 24', 'Mitarbeiter 25', 'Mitarbeiter 26', 'Mitarbeiter 27', 'Mitarbeiter 28', 'Mitarbeiter 29', 'Mitarbeiter 30', 'Mitarbeiter 31', 'Mitarbeiter 32', 'Mitarbeiter 33', 'Mitarbeiter 34', 'Mitarbeiter 35', 'Mitarbeiter 36', 'Mitarbeiter 37', 'Mitarbeiter 38', 'Mitarbeiter 39', 'Mitarbeiter 40', 'Mitarbeiter 41', 'Mitarbeiter 42', 'Mitarbeiter 43', 'Mitarbeiter 44', 'Mitarbeiter 45', 'Mitarbeiter 46', 'Mitarbeiter 47', 'Mitarbeiter 48', 'Mitarbeiter 49', 'Mitarbeiter 50', 'Mitarbeiter 51', 'Mitarbeiter 52', 'Mitarbeiter 53', 'Mitarbeiter 54', 'Mitarbeiter 55', 'Mitarbeiter 56', 'Mitarbeiter 57', 'Mitarbeiter 58', 'Mitarbeiter 59', 'Mitarbeiter 60', 'Mitarbeiter 61', 'Mitarbeiter 62', 'Mitarbeiter 63', 'Mitarbeiter 64', 'Mitarbeiter 65', 'Mitarbeiter 66', 'Mitarbeiter 67', 'Mitarbeiter 68', 'Mitarbeiter 69', 'Mitarbeiter 70', 'Mitarbeiter 71', 'Mitarbeiter 72', 'Mitarbeiter 73', 'Mitarbeiter 74', 'Mitarbeiter 75', 'Mitarbeiter 76', 'Mitarbeiter 77', 'Mitarbeiter 78', 'Mitarbeiter 79', 'Mitarbeiter 80', 'Mitarbeiter 81', 'Mitarbeiter 82', 'Mitarbeiter 83', 'Mitarbeiter 84', 'Mitarbeiter 85', 'Mitarbeiter 86', 'Mitarbeiter 87', 'Mitarbeiter 88', 'Mitarbeiter 89', 'Mitarbeiter 90', 'Mitarbeiter 91', 'Mitarbeiter 92', 'Mitarbeiter 93', 'Mitarbeiter 94', 'Mitarbeiter 95', 'Mitarbeiter 96', 'Mitarbeiter 97', 'Mitarbeiter 98', 'Mitarbeiter 99', 'Mitarbeiter 100', 'Mitarbeiter 101', 'Mitarbeiter 102', 'Mitarbeiter 103'
];

const initialTrucks = ['MS-LKW', 'CS-LKW', 'IB-LKW', 'SV-LKW','BA-LKW','IB-LKW','CI-LKW','4W-LKW'];
const initialFrachter = ['SV', 'EY', 'CA', 'AA', 'BA', 'CI', 'CZ', 'OZ', 'IB766', 'IB9400', 'OS188', 'OZ542', 'OZ776', 'OZ794', 'OZ796'];
const initialPax = [
  'EY122', 'EY124', 'EY916', 'SV914', 'SV926', 'SV930', 'RJ126',
  'AI120', 'AI2026', 'AI2028', 'BA901', 'BA903', 'BA907', 'BA909',
  'BA911', 'BA913', 'BA915', 'BA3319', 'BA3385', 'BA3387', 'CA432',
  'CA772', 'CA932', 'CA936', 'CA958', 'CA966', 'CA1014', 'CA1022',
  'CA1036', 'CA1042', 'CA1048', 'CI62', 'CI5522', 'CK216', 'EI651',
  'EI657', 'EY122', 'EY124', 'EY916', 'SQ25', 'SQ26', 'SQ325',
  'SV914', 'SV926', 'SV930'
];

const initial3P = ['ACM 06:00', 'ACM 14:00', 'ACM 22:00', 'IGS 06:00', 'IGS 14:00', 'IGS 22:00', 'KAT 06:00', 'KAT 14:00', 'KAT 22:00', 'MY Cargo 06:00', 'MY Cargo 14:00', 'MY Cargo 22:00'," hey"];

const timeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
const comingLaterTimes = ['09:00', '11:00', '14:00'];

const airlineLogos = {
  'CA': '/air-china-logo-.png',
  'SV': '/Saudi-Arabian-Airlines-Logo.png',
  'EY': '/Etihad-airways-logo.png',
  'AA': '/logo-american-airlines.png',
  'BA': '/British_Airways-Logo.png',
  'OZ': '/Asiana-Airlines-Logo.png',
  'IB766': '/Logo_iberia.png',
  'IB9400': '/Logo_iberia.png',
  'OS188': '/Austrian-Airlines-Logo.png',
  'OZ542': '/Asiana-Airlines-Logo.png',
  'OZ776': '/Asiana-Airlines-Logo.png',
  'OZ794': '/Asiana-Airlines-Logo.png',
  'OZ796': '/Asiana-Airlines-Logo.png',
  'CZ': '/ChinaSouthernAirlines.png',
  'CI': '/China-Airlines-Logo.png',
  // Add more airlines as you get their logos
  // 'AA': '/american-airlines-logo.png',
  // etc.
};

const frachterDeadlines = {
  'CA': '10:00',
  'SV': '11:00', // Example: CA has deadline at 10:00
  // Add more deadlines as needed
  // 'SV': '11:00',
  // 'EY': '12:00',
  // etc.
};

const blinkingAnimation = `
  @keyframes blink {
    0% { 
      opacity: 1;
      background-color: #ff4444;
    }
    50% { 
      opacity: 0.3;
      background-color: #ffaaaa;
    }
    100% { 
      opacity: 1;
      background-color: #ff4444;
    }
  }
`;

const calculateBlinkSpeed = (deadline) => {
  const now = new Date();
  const [hours, minutes] = deadline.split(':').map(Number);
  const deadlineTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  const timeDiff = deadlineTime - now;
  const minutesUntilDeadline = timeDiff / (1000 * 60);

  if (minutesUntilDeadline <= 0 || minutesUntilDeadline > 60) return null;
  
  // Return faster animation for closer deadlines
  if (minutesUntilDeadline <= 15) return '0.5s';
  if (minutesUntilDeadline <= 30) return '1s';
  return '1.5s';
};

const DragDropScheduler = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [employees, setEmployees] = useState([]);
  const [trucks, setTrucks] = useState(initialTrucks);
  const [frachter, setFrachter] = useState(initialFrachter);
  const [pax, setPax] = useState(initialPax);
  const [threeP, setThreeP] = useState(initial3P);
  const [schedule, setSchedule] = useState({});
  const [newItem, setNewItem] = useState('');
  const [newItemType, setNewItemType] = useState('task');
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [sickEmployees, setSickEmployees] = useState([]);
  const [vacationEmployees, setVacationEmployees] = useState([]);
  const [comingLaterEmployees, setComingLaterEmployees] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const dragItemRef = useRef(null);
  const [sections, setSections] = useState({
    brandabschnitt3: ['left'],
    brandabschnitt4: ['left'],
    brandabschnitt5: ['left'],
    brandabschnitt6: ['left']
  });
  const [scheduleHistory, setScheduleHistory] = useState([]);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const schedules = await sharePointService.getSchedules();
        setSavedSchedules(schedules);
        console.log('Loaded Schedules:', schedules);
        
        if (schedules.length > 0) {
          const mostRecent = schedules[0];
          setSchedule(mostRecent.schedule);
          setSickEmployees(mostRecent.sickEmployees || []);
          setVacationEmployees(mostRecent.vacationEmployees || []);
          setComingLaterEmployees(mostRecent.comingLaterEmployees || {});
        }
      } catch (error) {
        console.error('Error loading schedules:', error);
        const savedSchedule = localStorage.getItem('schedule');
        if (savedSchedule) {
          setSchedule(JSON.parse(savedSchedule));
        }
      }
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('sickEmployees', JSON.stringify(sickEmployees));
    localStorage.setItem('vacationEmployees', JSON.stringify(vacationEmployees));
    localStorage.setItem('comingLaterEmployees', JSON.stringify(comingLaterEmployees));
  }, [schedule, sickEmployees, vacationEmployees, comingLaterEmployees]);

  useEffect(() => {
    const sampleSchedule = {
      id: 1,
      date: new Date().toLocaleString(),
      schedule: { 'Area 1': ['Task 1', 'Employee 1'] },
      sickEmployees: [],
      vacationEmployees: [],
      comingLaterEmployees: {}
    };
    setSavedSchedules([sampleSchedule]);
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem) {
      switch (newItemType) {
        case 'task':
          setTasks([...tasks, newItem]);
          break;
        case 'truck':
          setTrucks([...trucks, newItem]);
          break;
        case 'frachter':
          setFrachter([...frachter, newItem]);
          break;
        case 'pax':
          setPax([...pax, newItem]);
          break;
        case 'threeP':
          setThreeP([...threeP, newItem]);
          break;
      }
      setNewItem('');
    }
  };

  const handleAddEmployee = () => {
    if (selectedEmployee && !employees.includes(selectedEmployee)) {
      setEmployees([...employees, selectedEmployee]);
      setSelectedEmployee('');
    }
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };

  const onTouchStart = (e, item) => {
    setDraggedItem(item);
    dragItemRef.current = e.target;
    e.target.style.opacity = '0.5';
  };

  const onTouchMove = (e) => {
    if (dragItemRef.current) {
      e.preventDefault();
      const touch = e.touches[0];
      dragItemRef.current.style.position = 'absolute';
      dragItemRef.current.style.left = `${touch.pageX}px`;
      dragItemRef.current.style.top = `${touch.pageY}px`;
    }
  };

  const onTouchEnd = (e, area) => {
    if (draggedItem) {
      setSchedule(prev => ({
        ...prev,
        [area]: [...(prev[area] || []), draggedItem]
      }));
      setEmployees(prev => prev.filter(emp => emp !== draggedItem));
      setDraggedItem(null);
      if (dragItemRef.current) {
        dragItemRef.current.style.opacity = '1';
        dragItemRef.current.style.position = 'static';
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, area) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text');
    
    if ((area === 'sick' || area === 'vacation') && !allEmployees.includes(item)) {
      return;
    }
    
    if (area === 'sick') {
      setSickEmployees(prev => [...prev, item]);
      setEmployees(prev => prev.filter(emp => emp !== item));
    } else if (area === 'vacation') {
      setVacationEmployees(prev => [...prev, item]);
      setEmployees(prev => prev.filter(emp => emp !== item));
    } else if (comingLaterTimes.includes(area)) {
      setComingLaterEmployees(prev => ({
        ...prev,
        [area]: [...(prev[area] || []), item]
      }));
      setEmployees(prev => prev.filter(emp => emp !== item));
    } else {
      setSchedule(prev => ({
        ...prev,
        [area]: [...(prev[area] || []), item]
      }));
      if (initialTrucks.includes(item)) {
        setTrucks(prev => prev.filter(truck => truck !== item));
      } else if (allEmployees.includes(item)) {
        setEmployees(prev => prev.filter(emp => emp !== item));
      } else if (initialFrachter.includes(item)) {
        setFrachter(prev => prev.filter(f => f !== item));
      } else if (initialPax.includes(item)) {
        setPax(prev => prev.filter(p => p !== item));
      } else if (initial3P.includes(item)) {
        setThreeP(prev => prev.filter(tp => tp !== item));
      }
    }
    updateSchedule(
      {
        ...schedule,
        [area]: [...(schedule[area] || []), item]
      },
      sickEmployees,
      vacationEmployees,
      comingLaterEmployees
    );
  };

  const handleRemoveItem = (area, item) => {
    if (area === 'sick') {
      setSickEmployees(prev => prev.filter(emp => emp !== item));
    } else if (area === 'vacation') {
      setVacationEmployees(prev => prev.filter(emp => emp !== item));
    } else if (comingLaterTimes.includes(area)) {
      setComingLaterEmployees(prev => ({
        ...prev,
        [area]: prev[area].filter(emp => emp !== item)
      }));
    } else {
      setSchedule(prev => ({
        ...prev,
        [area]: prev[area].filter(i => i !== item)
      }));
      if (initialTasks.includes(item) && !tasks.includes(item)) {
        setTasks(prev => [...prev, item]);
      } else if (allEmployees.includes(item)) {
        setEmployees(prev => [...prev, item]);
      } else if (initialTrucks.includes(item) && !trucks.includes(item)) {
        setTrucks(prev => [...prev, item]);
      } else if (initialFrachter.includes(item)) {
        setFrachter(prev => [...prev, item]);
      } else if (initialPax.includes(item)) {
        setPax(prev => [...prev, item]);
      } else if (initial3P.includes(item)) {
        setThreeP(prev => [...prev, item]);
      }
    }
  };

  const handleUndo = () => {
    if (scheduleHistory.length > 0) {
      const lastState = scheduleHistory[scheduleHistory.length - 1];
      setSchedule(lastState.schedule);
      setSickEmployees(lastState.sickEmployees);
      setVacationEmployees(lastState.vacationEmployees);
      setComingLaterEmployees(lastState.comingLaterEmployees);
      setTasks(lastState.tasks);
      setEmployees(lastState.employees);
      setTrucks(lastState.trucks);
      setFrachter(lastState.frachter);
      setPax(lastState.pax);
      setThreeP(lastState.threeP);
      setScheduleHistory(scheduleHistory.slice(0, -1));
    }
  };

  const updateSchedule = (newSchedule, newSickEmployees, newVacationEmployees, newComingLaterEmployees) => {
    setScheduleHistory(prev => [
      ...prev,
      {
        schedule,
        sickEmployees,
        vacationEmployees,
        comingLaterEmployees,
        tasks,
        employees,
        trucks,
        frachter,
        pax,
        threeP
      }
    ]);
    setSchedule(newSchedule);
    setSickEmployees(newSickEmployees);
    setVacationEmployees(newVacationEmployees);
    setComingLaterEmployees(newComingLaterEmployees);
  };

  const handleSave = async () => {
    // Define scheduleData outside try/catch to make it available in both blocks
    const scheduleData = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      schedule,
      sickEmployees,
      vacationEmployees,
      comingLaterEmployees
    };

    try {
      await sharePointService.saveSchedule(scheduleData);
      const updatedSchedules = await sharePointService.getSchedules();
      setSavedSchedules(updatedSchedules);
      console.log('Saved Schedules:', updatedSchedules);
      setSaveMessage('Zeitplan gespeichert!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving schedule:', error);
      setSaveMessage('Fehler beim Speichern!');
      
      // Fallback to local storage if SharePoint fails
      const updatedSavedSchedules = [...savedSchedules, scheduleData];
      setSavedSchedules(updatedSavedSchedules);
      localStorage.setItem('savedSchedules', JSON.stringify(updatedSavedSchedules));
    }
  };

  const handleLoadSchedule = (savedSchedule) => {
    setSchedule(savedSchedule.schedule);
    setSickEmployees(savedSchedule.sickEmployees || []);
    setVacationEmployees(savedSchedule.vacationEmployees || []);
    setComingLaterEmployees(savedSchedule.comingLaterEmployees || {});
    setSelectedSchedule(savedSchedule);
  };

  const handleExportData = () => {
    const currentData = {
      date: new Date().toLocaleString(),
      schedule,
      sickEmployees,
      vacationEmployees,
      comingLaterEmployees
    };

    // Helper function to get all items for a brandabschnitt
    const getBrandabschnittItems = (brandabschnitt) => {
      return sections[brandabschnitt].map(section => {
        const sectionItems = schedule[`${brandabschnitt}_${section}`] || [];
        return sectionItems.join(', ');
      }).filter(items => items).join(' | '); // Join different sections with ' | '
    };

    const csvContent = [
      ['Datum', 'Brandabschnitt', 'Zugewiesene Mitarbeiter/Aufgaben'],
      // Combine all sections of each brandabschnitt into one line
      ...['brandabschnitt3', 'brandabschnitt4', 'brandabschnitt5', 'brandabschnitt6'].map(area => [
        currentData.date,
        area,
        getBrandabschnittItems(area)
      ]),
      // Add a separator line
      ['---', '---', '---'],
      // Add sick employees
      ['Kranke Mitarbeiter', '', sickEmployees.join(', ')],
      // Add vacation employees
      ['Mitarbeiter im Urlaub', '', vacationEmployees.join(', ')],
      // Add employees coming later
      ...Object.entries(comingLaterEmployees).map(([time, emps]) => 
        [`Später kommend (${time})`, '', emps.join(', ')]
      )
    ].map(row => row.join(',')).join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `lager_einsatzplan_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeleteAllSavedPlans = async () => {
    try {
      await Promise.all(savedSchedules.map(schedule => 
        sharePointService.deleteSchedule(schedule.id)
      ));
      setSavedSchedules([]);
      setSaveMessage('Alle gespeicherten Zeitplne wurden gelöscht!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting schedules:', error);
      setSaveMessage('Fehler beim Löschen!');
    }
  };

  const handleLogin = () => {
    if (passwordInput === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
    setPasswordInput('');
  };

  const handleAddSection = (area) => {
    setSections(prev => ({
      ...prev,
      [area]: [...prev[area], `section${prev[area].length + 1}`]
    }));
  };

  const handleRemoveSection = (area) => {
    setSections(prev => {
      if (prev[area].length <= 1) return prev; // Prevent removing the last section
      const newSections = {...prev};
      newSections[area] = prev[area].slice(0, -1); // Remove the last section
      return newSections;
    });
  };

  const getItemStyle = (item, area) => {
    const baseStyle = {
      marginBottom: '5px',
      padding: '4px 8px',
      backgroundColor: getItemColor(item),
      borderRadius: '4px',
      position: 'relative',
      color: initial3P.includes(item) ? 'white' :
            (initialFrachter.includes(item) && Object.keys(airlineLogos).some(code => item.startsWith(code)))
              ? 'black'
              : 'white',
      fontSize: '1em',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    };

    // Check if item is a Frachter and has a deadline
    if (initialFrachter.includes(item)) {
      const frachterCode = Object.keys(frachterDeadlines).find(code => item.startsWith(code));
      if (frachterCode && area?.startsWith('brandabschnitt')) {
        const blinkSpeed = calculateBlinkSpeed(frachterDeadlines[frachterCode]);
        if (blinkSpeed) {
          return {
            ...baseStyle,
            animation: `blink ${blinkSpeed} infinite`,
            backgroundColor: '#ff4444', // Set initial background color
            color: 'white', // Ensure text is visible on red background
          };
        }
      }
    }

    return baseStyle;
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '50px 70px',
          backgroundColor: '#fff', 
          borderRadius: '20px', 
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          minWidth: '400px',
          transform: 'translateY(-20px)'
        }}>
          <img 
            src="/fcs-logo.png" 
            alt="FCS Logo" 
            style={{
              width: '300px',
              marginBottom: '10px'
            }}
          />
          <h2 style={{ marginBottom: '30px', color: '#333' }}>Lager-Einsatzplan</h2>
          <div style={{
            position: 'relative',
            marginBottom: '35px'
          }}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Passwort eingeben"
              style={{ 
                width: '100%',
                padding: '15px 20px',
                fontSize: '18px',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                outline: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8f9fa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3498db';
                e.target.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button 
            onClick={handleLogin} 
            style={{ 
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.2)';
            }}
          >
            Anmelden
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{blinkingAnimation}</style>

      <div style={{ 
        fontFamily: 'Arial, sans-serif', 
        padding: '20px', 
        maxWidth: '100%', 
        margin: '0 auto',
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <img 
          src="/fcs-logo.png" 
          alt="FCS Logo" 
          style={{
            width: '150px',
            marginBottom: '10px'
          }}
        />
        <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Lager-Einsatzplan</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleUndo} style={buttonStyle}>Rückgängig</button>
          <button onClick={handleSave} style={buttonStyle}>Speichern</button> 
          <button onClick={handleExportData} style={buttonStyle}>Daten Exportieren</button>
          <button onClick={handleDeleteAllSavedPlans} style={buttonStyle}>Zeitpläne Löschen</button>
          {saveMessage && <span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>{saveMessage}</span>}
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <h2 style={subheaderStyle}>Neuen Eintrag hinzufügen</h2>
          <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Name des neuen Eintrags"
              style={inputStyle}
            />
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
              style={selectStyle}
            >
              <option value="task">Aufgabe</option>
              <option value="truck">LKW</option>
              <option value="frachter">Frachter</option>
              <option value="pax">PAX</option>
              <option value="threeP">3P</option>
            </select>
            <button type="submit" style={buttonStyle}>Hinzufügen</button>
          </form>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>Aufgaben</h2>
            <ul style={{
              ...listStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '5px'
            }}>
              {tasks.map((task, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, task)} 
                  onTouchStart={(e) => onTouchStart(e, task)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{
                    ...listItemStyle,
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '1em',
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>Mitarbeiter</h2>
            <div style={{ marginBottom: '10px' }}>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                style={selectStyle}
              >
                <option value="">Mitarbeiter auswählen</option>
                {allEmployees.map((employee, index) => (
                  <option key={index} value={employee}>{employee}</option>
                ))}
              </select>
              <button onClick={handleAddEmployee} style={buttonStyle}>Hinzufügen</button>
            </div>
            <ul style={listStyle}>
              {employees.map((employee, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, employee)} 
                  onTouchStart={(e) => onTouchStart(e, employee)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{...listItemStyle, backgroundColor: 'red', color: 'white'}}
                >
                  {employee}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>LKW</h2>
            <ul style={{
              ...listStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '5px'
            }}>
              {trucks.map((truck, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, truck)} 
                  onTouchStart={(e) => onTouchStart(e, truck)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{
                    ...listItemStyle,
                    backgroundColor: 'orange',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '1em',
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  {truck}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>Frachter</h2>
            <ul style={{
              ...listStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '5px'
            }}>
              {frachter.map((ship, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, ship)} 
                  onTouchStart={(e) => onTouchStart(e, ship)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{
                    ...listItemStyle,
                    backgroundColor: 'orange',
                    color: 'white',
                    padding: '8px 12px',
                    fontSize: '1em',
                    textAlign: 'center',
                    margin: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '40px'
                  }}
                >
                  {Object.keys(airlineLogos).some(code => ship.startsWith(code)) && (
                    <img 
                      src={airlineLogos[ship.split(' ')[0]]} 
                      alt={`${ship} logo`}
                      style={{
                        position: 'absolute',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'contain',
                        opacity: 0.4,
                        zIndex: 1
                      }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 2 }}>{ship}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>PAX</h2>
            <ul style={{
              ...listStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '5px'
            }}>
              {pax.map((paxItem, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, paxItem)} 
                  onTouchStart={(e) => onTouchStart(e, paxItem)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{
                    ...listItemStyle,
                    backgroundColor: 'orange',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '1em',
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  {paxItem}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
            <h2 style={subheaderStyle}>3P</h2>
            <ul style={{
              ...listStyle,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '5px'
            }}>
              {threeP.map((threePItem, index) => (
                <li 
                  key={index} 
                  draggable 
                  onDragStart={(e) => onDragStart(e, threePItem)} 
                  onTouchStart={(e) => onTouchStart(e, threePItem)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => setDraggedItem(null)}
                  style={{
                    ...listItemStyle,
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '1em',
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  {threePItem}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Main content - Brandabschnitte */}
          <div style={{ flex: '1 1 80%' }}>
            <h2 style={subheaderStyle}>Aktueller Zeitplan {selectedSchedule && `(Geladen: ${selectedSchedule.date})`}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {['brandabschnitt3', 'brandabschnitt4', 'brandabschnitt5', 'brandabschnitt6'].map(area => (
                <div 
                  key={area} 
                  style={{ 
                    border: '2px solid #2c3e50', 
                    borderRadius: '8px', 
                    padding: '15px',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '15px',
                    borderBottom: '2px solid #2c3e50',
                    paddingBottom: '8px'
                  }}>
                    <h3 style={{ 
                      margin: 0,
                      color: '#2c3e50', 
                      fontSize: '1.4em',
                      textTransform: 'uppercase',
                    }}>{area}</h3>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        onClick={() => handleRemoveSection(area)}
                        style={{
                          ...buttonStyle,
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          fontSize: '1.2em',
                          opacity: sections[area].length <= 1 ? 0.5 : 1,
                          cursor: sections[area].length <= 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        −
                      </button>
                      <button
                        onClick={() => handleAddSection(area)}
                        style={{
                          ...buttonStyle,
                          padding: '4px 8px',
                          backgroundColor: '#4CAF50',
                          fontSize: '1.2em'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${sections[area].length}, 1fr)`, 
                    gap: '15px' 
                  }}>
                    {sections[area].map((section, index) => (
                      <div
                        key={index}
                        style={{ 
                          minHeight: '200px', 
                          backgroundColor: '#ffffff', 
                          padding: '12px', 
                          borderRadius: '6px',
                          border: '1px dashed #bdc3c7',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)'
                        }}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, `${area}_${section}`)}
                        onTouchEnd={(e) => onTouchEnd(e, `${area}_${section}`)}
                      >
                        {schedule[`${area}_${section}`]?.map((item, index) => (
                          <div key={index} style={getItemStyle(item, `${area}_${section}`)}>
                            {initialFrachter.includes(item) && Object.keys(airlineLogos).some(code => item.startsWith(code)) && (
                              <img 
                                src={airlineLogos[item.split(' ')[0]]} 
                                alt={`${item} logo`}
                                style={{
                                  position: 'absolute',
                                  maxWidth: '80%',
                                  maxHeight: '80%',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  objectFit: 'contain',
                                  opacity: 0.4,
                                  zIndex: 1
                                }}
                              />
                            )}
                            <span style={{ 
                              position: 'relative', 
                              zIndex: 2,
                              fontWeight: initialFrachter.includes(item) && Object.keys(airlineLogos).some(code => item.startsWith(code)) 
                                ? 'bold'  // Make text bold for better readability with logos
                                : 'normal'
                            }}>{item}</span>
                            <button onClick={() => handleRemoveItem(`${area}_${section}`, item)} style={{...removeButtonStyle, zIndex: 3}}>X</button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Status sections */}
          <div style={{ flex: '0 0 20%', maxWidth: '250px' }}>
            <div style={{ 
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#dc3545' }}>Krank</h4>
              <div
                style={{ 
                  minHeight: '60px',
                  backgroundColor: '#fff',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px dashed #dc3545'
                }}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'sick')}
              >
                {sickEmployees.map((emp, index) => (
                  <div key={index} style={{ 
                    marginBottom: '4px',
                    padding: '4px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    borderRadius: '3px',
                    fontSize: '0.9em',
                    position: 'relative'
                  }}>
                    {emp}
                    <button onClick={() => {
                      handleRemoveItem('sick', emp);
                      setEmployees(prev => [...prev, emp]); // Add back to employees
                    }} style={removeButtonStyle}>X</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#ffc107' }}>Urlaub</h4>
              <div
                style={{ 
                  minHeight: '60px',
                  backgroundColor: '#fff',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px dashed #ffc107'
                }}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'vacation')}
              >
                {vacationEmployees.map((emp, index) => (
                  <div key={index} style={{ 
                    marginBottom: '4px',
                    padding: '4px',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    borderRadius: '3px',
                    fontSize: '0.9em',
                    position: 'relative'
                  }}>
                    {emp}
                    <button onClick={() => handleRemoveItem('vacation', emp)} style={removeButtonStyle}>X</button>
                    <button onClick={() => setEmployees(prev => [...prev, emp])} style={removeButtonStyle}>+</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '10px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#17a2b8' }}>Kommen noch</h4>
              {comingLaterTimes.map(time => (
                <div key={time} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '4px' }}>{time}</div>
                  <div
                    style={{ 
                      minHeight: '40px',
                      backgroundColor: '#fff',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px dashed #17a2b8'
                    }}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, time)}
                  >
                    {comingLaterEmployees[time]?.map((emp, index) => (
                      <div key={index} style={{ 
                        marginBottom: '4px',
                        padding: '4px',
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        borderRadius: '3px',
                        fontSize: '0.9em'
                      }}>
                        {emp}
                        <button onClick={() => handleRemoveItem(time, emp)} style={removeButtonStyle}>X</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h2 style={subheaderStyle}>Gespeicherte Zeitpläne</h2>
          <ul style={{ ...listStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
            {savedSchedules.map((saved) => (
              <li key={saved.id} style={{ ...listItemStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{saved.date}</span>
                <button onClick={() => handleLoadSchedule(saved)} style={buttonStyle}>
                  Laden
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

};

const getItemColor = (item) => {
  if (initialTasks.includes(item)) {
    return 'blue';
  } else if (allEmployees.includes(item)) {
    return 'red';
  } else if (initialTrucks.includes(item)) {
    return 'orange';
  } else if (initialFrachter.includes(item)) {
    return Object.keys(airlineLogos).some(code => item.startsWith(code)) 
      ? '#ffffff' 
      : 'orange';
  } else if (initialPax.includes(item)) {
    return 'orange';
  } else if (initial3P.includes(item)) {
    return '#6c757d';
  } else {
    return 'grey';
  }
};

const buttonStyle = {
  padding: '8px 12px',
  margin: '0 5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: 1,
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const subheaderStyle = {
  color: '#444',
  borderBottom: '1px solid #ccc',
  paddingBottom: '5px',
  marginBottom: '10px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  padding: '8px',
  marginBottom: '5px',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  cursor: 'move',
};

const removeButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  backgroundColor: 'grey',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
};

export default DragDropScheduler;
