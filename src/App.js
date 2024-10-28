import React, { useState, useEffect, useRef } from 'react';

const initialTasks = [
  'Wareneingang', 'Kommissionierung', 'Verpackung', 'Qualitätskontrolle',
  'Inventur', 'Versand', 'Retouren', 'Lageroptimierung'
];

const allEmployees = [
  'Akbakay, Murat', 'Akdemir, Tuncer', 'Akgün, Salih', 'Akinci, Bünyamün', 'Alish, Mehmed', 'Alkan, Osman', 'Altiok, Veysel', 'Amadori, Andrea', 'Aramyan, Edgar', 'Aslankara, Ali', 'Atmaca, Hasan', 'Avinc, Ramazan', 'Aydogan, Bülent', 'Aygün, Mehmet', 'Baser, Ramazan', 'Becker, Nico', 'Beysülen, Gürsel', 'Bingül, Hasan', 'Bizimyer, Yusuf', 'Bostanci, Dogan', 'Cakiroglu, Barkin', 'Cay, Mehmet', 'Cay, Muzaffer', 'Chopsonidis, Iraklis', 'Cicek, Mahmut', 'Cicek, Nurullah', 'Cildir, Cüneyt', 'Cimen, Zafer', 'Cöplü, Ali', 'Coskun, Mehmet', 'Degirmencioglu, Nurullah', 'Dinc, Ali', 'Dogan, Lütfi', 'Dragojlovic, Aleksandar', 'Duymaz, Mustafa', 'El Hichar Jebli, Ibrahim', 'El Omari, Abdelhamid', 'Emin, Emin Yakub', 'Ercan, Vakkas', 'Ezer, Mustafa', 'Frieser, Dominik Michael', 'Garic, Nebojsa', 'Gedik, Bekir', 'Gökgül, Ömer', 'Göratas, Ali', 'Görkem, Mahmut Baran', 'Gül, Mehmet', 'Güler, Habip', 'Gümüs, Sascha', 'Gün, Yasin', 'Günay, Bünyamin', 'Harmanci, Ishak', 'Harmanci, Gürkan', 'Hennemann, Sven', 'Jelaca, Milan', 'Kacan, Süleyman', 'Kanat, Eyüp', 'Kapusuz, Fikret', 'Karaivanov, Nikolay', 'Kavousi, Morteza', 'Kilic, Safak', 'Kirez, Murat', 'Kol, Besir', 'Kol, Mehmet', 'Kol, Ali', 'Korkmaz, Eresul', 'Kurnaz, Orhan', 'Kurnaz, Yusuf', 'Kuschnir, Alexander', 'Luniak, Robert Michael', 'Michel, Reiner', 'Mihaljevic, Stjepan', 'Mihaljevic, Zlatko', 'Mikacic, Mario', 'Moghaddami, Ali', 'Münk, Torsten', 'Nalbadis, Ioannis', 'Nicola, Alexandru Georgian', 'Okmen, Metin', 'Okyay, Yakup', 'Onar, Ibrahim', 'Özcan, Mustafa', 'Özdenses, Selcuk', 'Öztokac, Erkan', 'Öztürk, Ceyhun', 'Polus, Robert', 'Russo, Rocco', 'Sarac, Vezneder', 'Saylam, Ramazan', 'Schaffer, Andreas', 'Scrocca, Giuseppe', 'Sesum, Slobodan', 'Sevik, Veysel', 'Siebert-Gonther, Daniel', 'Tahiryumer, Mesud', 'Tastekin, Ibrahim', 'Tayboga, Ömer', 'Tiras, Batuhan', 'Toksun, Hüseyin', 'Tordogan, Mehmet Ali', 'Toumpan, Ekrem', 'Ufuah, Kingsley Ebalunegbefo', 'Ugurlu, Aydin', 'Ulusoy, Mehmet', 'Ünal, Hakan', 'Vinkovic, Mato', 'Yakub, Hyusmen Kadir', 'Yilmaz, Özgür Oguz', 'Yilmaz, Firat', 'Yilmaz, Hasan', 'Yücel, Bayram', 'Yurt, Yilmaz', 'Zaher, Adil Khan'
];

const initialTrucks = ['MS-LKW', 'CS-LKW', 'IB-LKW', 'SV-LKW','BA-LKW','IB-LKW','CI-LKW','4W-LKW'];
const initialFrachter = ['SV', 'EY', 'CA', 'AA'];

const initial3P = ['ACM 06:00', 'ACM 14:00', 'ACM 22:00', 'IGS 06:00', 'IGS 14:00', 'IGS 22:00', 'KAT 06:00', 'KAT 14:00', 'KAT 22:00', 'MY Cargo 06:00', 'MY Cargo 14:00', 'MY Cargo 22:00'];

const timeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
const comingLaterTimes = ['09:00', '11:00', '14:00'];

const DragDropScheduler = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [employees, setEmployees] = useState([]);
  const [trucks, setTrucks] = useState(initialTrucks);
  const [frachter, setFrachter] = useState(initialFrachter);
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

  useEffect(() => {
    const savedSchedule = localStorage.getItem('schedule');
    const saved = localStorage.getItem('savedSchedules');
    const savedSick = localStorage.getItem('sickEmployees');
    const savedVacation = localStorage.getItem('vacationEmployees');
    const savedComingLater = localStorage.getItem('comingLaterEmployees');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
    if (saved) {
      setSavedSchedules(JSON.parse(saved));
    }
    if (savedSick) {
      setSickEmployees(JSON.parse(savedSick));
    }
    if (savedVacation) {
      setVacationEmployees(JSON.parse(savedVacation));
    }
    if (savedComingLater) {
      setComingLaterEmployees(JSON.parse(savedComingLater));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('sickEmployees', JSON.stringify(sickEmployees));
    localStorage.setItem('vacationEmployees', JSON.stringify(vacationEmployees));
    localStorage.setItem('comingLaterEmployees', JSON.stringify(comingLaterEmployees));
  }, [schedule, sickEmployees, vacationEmployees, comingLaterEmployees]);

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
    if (area === 'sick') {
      setSickEmployees(prev => [...prev, item]);
    } else if (area === 'vacation') {
      setVacationEmployees(prev => [...prev, item]);
    } else if (comingLaterTimes.includes(area)) {
      setComingLaterEmployees(prev => ({
        ...prev,
        [area]: [...(prev[area] || []), item]
      }));
    } else {
      setSchedule(prev => ({
        ...prev,
        [area]: [...(prev[area] || []), item]
      }));
    }
    setEmployees(prev => prev.filter(emp => emp !== item));
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
    }
    if (allEmployees.includes(item)) {
      setEmployees(prev => [...prev, item]);
    }
  };

  const handleUndo = () => {
    setSchedule({});
    setSelectedSchedule(null);
    setSickEmployees([]);
    setVacationEmployees([]);
    setComingLaterEmployees({});
  };

  const handleSave = () => {
    const newSavedSchedule = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      schedule: schedule,
      sickEmployees: sickEmployees,
      vacationEmployees: vacationEmployees,
      comingLaterEmployees: comingLaterEmployees
    };
    const updatedSavedSchedules = [...savedSchedules, newSavedSchedule];
    setSavedSchedules(updatedSavedSchedules);
    localStorage.setItem('savedSchedules', JSON.stringify(updatedSavedSchedules));
    setSaveMessage('Zeitplan gespeichert!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLoadSchedule = (savedSchedule) => {
    setSchedule(savedSchedule.schedule);
    setSickEmployees(savedSchedule.sickEmployees || []);
    setVacationEmployees(savedSchedule.vacationEmployees || []);
    setComingLaterEmployees(savedSchedule.comingLaterEmployees || {});
    setSelectedSchedule(savedSchedule);
  };

  const handleExportData = () => {
    const exportData = savedSchedules.flatMap(saved => {
      if (saved && saved.schedule) {
        return Object.entries(saved.schedule).flatMap(([area, items]) => {
          const workers = items.filter(item => employees.includes(item));
          const assignedTasks = items.filter(item => tasks.includes(item));
          const assignedTrucks = items.filter(item => trucks.includes(item));
          const assignedFrachter = items.filter(item => frachter.includes(item));
          const assignedThreeP = items.filter(item => threeP.includes(item));
          return workers.map(worker => {
            const shiftStart = new Date(saved.date);
            const currentTime = new Date();
            let shiftEnd = new Date(saved.date);
            let timeSlot = '';

            if (currentTime.getHours() >= 6 && currentTime.getHours() < 14) {
              timeSlot = '06-14 Uhr';
            } else if (currentTime.getHours() >= 14 && currentTime.getHours() < 22) {
              timeSlot = '14-22 Uhr';
            } else {
              timeSlot = '22-06 Uhr';
            }

            const taskEndTime = currentTime < shiftEnd ? currentTime : shiftEnd;
            const workerTimeSlot = currentTime < shiftEnd ? `${currentTime.toLocaleTimeString()} - ${taskEndTime.toLocaleTimeString()}` : timeSlot;

            return {
              date: saved.date,
              timeSlot: workerTimeSlot,
              worker,
              task: assignedTasks.join(', ') || 'No task assigned',
              truck: assignedTrucks.join(', ') || 'No truck assigned',
              frachter: assignedFrachter.join(', ') || 'No frachter assigned',
              threeP: assignedThreeP.join(', ') || 'No 3P assigned',
              status: saved.sickEmployees.includes(worker) ? 'Krank' : 
                      saved.vacationEmployees.includes(worker) ? 'Urlaub' : 
                      Object.values(saved.comingLaterEmployees).flat().includes(worker) ? 'Kommt später' : 'Aktiv',
              sickEmployees: saved.sickEmployees.join(', '),
              vacationEmployees: saved.vacationEmployees.join(', '),
              comingLaterEmployees: Object.entries(saved.comingLaterEmployees)
                .map(([time, emps]) => `${time}: ${emps.join(', ')}`)
                .join('; ')
            };
          });
        });
      }
      return [];
    });
    if (exportData.length === 0) {
      alert('Keine Daten zum Exportieren vorhanden.');
      return;
    }
    const csvContent = [
      ['Datum', 'Zeitslot', 'Mitarbeiter', 'Aufgabe', 'LKW', 'Frachter', '3P', 'Status', 'Kranke Mitarbeiter', 'Mitarbeiter im Urlaub', 'Später kommende Mitarbeiter', 'Bereich'],
      ...exportData.map(row => [
        `"${row.date}"`,
        row.timeSlot,
        row.worker,
        row.task,
        row.truck,
        row.frachter,
        row.threeP,
        row.status,
        `"[${row.sickEmployees}]"`,
        `"[${row.vacationEmployees}]"`,
        `"${row.comingLaterEmployees}"`,
        row.area || 'Unbekannt'
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'lager_einsatzplan_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeleteAllSavedPlans = () => {
    setSavedSchedules([]);
    localStorage.removeItem('savedSchedules');
    setSaveMessage('Alle gespeicherten Zeitpläne wurden gelöscht!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLogin = () => {
    if (passwordInput === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
    setPasswordInput('');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>Login</h2>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter password"
          style={{ ...inputStyle, width: '200px', marginRight: '10px' }}
        />
        <button onClick={handleLogin} style={buttonStyle}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
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
            <option value="threeP">3P</option>
          </select>
          <button type="submit" style={buttonStyle}>Hinzufügen</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h2 style={subheaderStyle}>Aufgaben</h2>
          <ul style={listStyle}>
            {tasks.map((task, index) => (
              <li 
                key={index} 
                draggable 
                onDragStart={(e) => onDragStart(e, task)} 
                onTouchStart={(e) => onTouchStart(e, task)}
                onTouchMove={onTouchMove}
                onTouchEnd={() => setDraggedItem(null)}
                style={{...listItemStyle, backgroundColor: 'blue', color: 'white'}}
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
          <ul style={listStyle}>
            {trucks.map((truck, index) => (
              <li 
                key={index} 
                draggable 
                onDragStart={(e) => onDragStart(e, truck)} 
                onTouchStart={(e) => onTouchStart(e, truck)}
                onTouchMove={onTouchMove}
                onTouchEnd={() => setDraggedItem(null)}
                style={{...listItemStyle, backgroundColor: 'orange', color: 'white'}}
              >
                {truck}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h2 style={subheaderStyle}>Airliner</h2>
          <ul style={listStyle}>
            {frachter.map((ship, index) => (
              <li 
                key={index} 
                draggable 
                onDragStart={(e) => onDragStart(e, ship)} 
                onTouchStart={(e) => onTouchStart(e, ship)}
                onTouchMove={onTouchMove}
                onTouchEnd={() => setDraggedItem(null)}
                style={{...listItemStyle, backgroundColor: 'orange', color: 'white'}}
              >
                {ship}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1 1 150px', minWidth: '150px' }}>
          <h2 style={subheaderStyle}>3P</h2>
          <ul style={listStyle}>
            {threeP.map((threePItem, index) => (
              <li 
                key={index} 
                draggable 
                onDragStart={(e) => onDragStart(e, threePItem)} 
                onTouchStart={(e) => onTouchStart(e, threePItem)}
                onTouchMove={onTouchMove}
                onTouchEnd={() => setDraggedItem(null)}
                style={{...listItemStyle, backgroundColor: 'white', color: 'black'}}
              >
                {threePItem}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <h2 style={subheaderStyle}>Krank</h2>
          <div
            style={{ minHeight: '100px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '3px' }}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'sick')}
          >
            {sickEmployees.map((employee, index) => (
              <div key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: getItemColor(employee), borderRadius: '3px', position: 'relative' }}>
                {employee}
                <button onClick={() => handleRemoveItem('sick', employee)} style={removeButtonStyle}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <h2 style={subheaderStyle}>Urlaub</h2>
          <div
            style={{ minHeight: '100px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '3px' }}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'vacation')}
          >
            {vacationEmployees.map((employee, index) => (
              <div key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: getItemColor(employee), borderRadius: '3px', position: 'relative' }}>
                {employee}
                <button onClick={() => handleRemoveItem('vacation', employee)} style={removeButtonStyle}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
          <h2 style={subheaderStyle}>Kommen noch</h2>
          {comingLaterTimes.map(time => (
            <div key={time}>
              <h3 style={{ margin: '10px 0 5px 0', fontSize: '0.9em', color: '#666' }}>{time}</h3>
              <div
                style={{ minHeight: '50px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '3px', marginBottom: '10px' }}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, time)}
              >
                {comingLaterEmployees[time]?.map((employee, index) => (
                  <div key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: getItemColor(employee), borderRadius: '3px', position: 'relative' }}>
                    {employee}
                    <button onClick={() => handleRemoveItem(time, employee)} style={removeButtonStyle}>X</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={subheaderStyle}>Aktueller Zeitplan {selectedSchedule && `(Geladen: ${selectedSchedule.date})`}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {['Area 1', 'Area 2', 'Area 3'].map(area => (
            <div 
              key={area} 
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#444' }}>{area}</h3>
              <div
                style={{ minHeight: '100px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '3px' }}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, area)}
                onTouchEnd={(e) => onTouchEnd(e, area)}
              >
                {schedule[area]?.map((item, index) => (
                  <div key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: getItemColor(item), borderRadius: '3px', position: 'relative', color: 'white' }}>
                    {item}
                    <button onClick={() => handleRemoveItem(area, item)} style={removeButtonStyle}>X</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
    return 'orange';
  } else if (initial3P.includes(item)) {
    return 'white';
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