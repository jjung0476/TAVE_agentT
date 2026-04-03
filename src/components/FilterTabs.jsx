function FilterTabs({ active, onChange, tabs }) {
  return (
    <div>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{ marginRight: '5px', fontWeight: active === tab ? 'bold' : 'normal' }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs