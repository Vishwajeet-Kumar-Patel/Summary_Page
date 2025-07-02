import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FilterPanel({ data, setFilteredData }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [school, setSchool] = useState('');
  const [session, setSession] = useState('');
  const [year, setYear] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [search, setSearch] = useState('');

  const schoolOptions = [...new Set(data.map((d) => d.school))];
  const yearOptions = [...new Set(data.map((d) => new Date(d.date).getFullYear()))];

  useEffect(() => {
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const d = new Date(item.date);
        return d >= startDate && d <= endDate;
      });
    }

    if (school) filtered = filtered.filter((item) => item.school === school);
    if (session) filtered = filtered.filter((item) => item.session === session);
    if (year) filtered = filtered.filter((item) => new Date(item.date).getFullYear().toString() === year);
    if (ageGroup) {
      filtered = filtered.filter((item) => {
        const age = item.age;
        if (ageGroup === '<10') return age < 10;
        if (ageGroup === '10–14') return age >= 10 && age <= 14;
        if (ageGroup === '15–18') return age >= 15 && age <= 18;
        if (ageGroup === '18+') return age > 18;
        return true;
      });
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [startDate, endDate, school, session, year, ageGroup, search]);

  const handleReset = () => {
    setDateRange([null, null]);
    setSchool('');
    setSession('');
    setYear('');
    setAgeGroup('');
    setSearch('');
    setFilteredData(data);
  };

  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 p-2 bg-transparent text-white backdrop-blur-sm">
      {/* Date Range Picker */}
      <div className="tooltip tooltip-bottom" data-tip="Filter by Date Range">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          placeholderText="Date Range"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          isClearable
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[160px]"
        />
      </div>

      {/* School Filter */}
      <div className="tooltip tooltip-bottom" data-tip="Filter by School">
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[140px]"
        >
          <option value="">School</option>
          {schoolOptions.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Session Filter */}
      <div className="tooltip tooltip-bottom" data-tip="Filter by Session">
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[130px]"
        >
          <option value="">Session</option>
          <option value="Jan - June">Jan - June</option>
          <option value="July - Dec">July - Dec</option>
        </select>
      </div>

      {/* Year Filter */}
      <div className="tooltip tooltip-bottom" data-tip="Filter by Year">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[100px]"
        >
          <option value="">Year</option>
          {yearOptions.map((y, i) => (
            <option key={i} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Age Group Filter */}
      <div className="tooltip tooltip-bottom" data-tip="Filter by Age Group">
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[100px]"
        >
          <option value="">Age</option>
          <option value="<10">&lt;10</option>
          <option value="10–14">10–14</option>
          <option value="15–18">15–18</option>
          <option value="18+">18+</option>
        </select>
      </div>

      {/* Search Box */}
      <div className="tooltip tooltip-bottom" data-tip="Search by Name or ID">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#2a2d3e] border border-[#3b3f55] text-sm text-white rounded-lg px-3 py-1 w-[160px]"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="ml-auto text-sm bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg transition-all"
      >
        Reset
      </button>
    </div>
  );
}
