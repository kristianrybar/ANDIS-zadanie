import { useState } from "react";

// Pomocná funkcia na odstránenie diakritiky
const removeDiacritics = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Pomocná funkcia na zvýraznenie textu
const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => 
        removeDiacritics(part.toLowerCase()) === removeDiacritics(searchTerm.toLowerCase()) 
            ? <span key={index} style={{ backgroundColor: 'orange' }}>{part}</span> 
            : part
    );
};

// Definícia typu objektu
type Item = {
    id: number;
    name: string;
    description: string;
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Pole objektov
    const items: Item[] = [
        { id: 1, name: "hruška", description: "Ovocie s diakritikou" },
        { id: 2, name: "banán", description: "Tropické ovocie" },
        { id: 3, name: "pomaranč", description: "Citrusový plod" },
        { id: 4, name: "sršanie", description: "Zvuk bzučiaceho hmyzu" }
    ];

    // Filtrovanie objektov na základe vstupu, ignorujúc diakritiku
    const filteredItems = items.filter(item =>
        removeDiacritics(item.name.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase())) ||
        removeDiacritics(item.description.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
    );

    return (
        <div className='w-full p-3'>
            <input
                type="text"
                placeholder="Hľadať..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <strong>{highlightText(item.name, searchTerm)}</strong> - {highlightText(item.description, searchTerm)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
