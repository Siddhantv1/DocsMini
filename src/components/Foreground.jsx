import { useRef, useState, useEffect } from 'react';
import Card from "./Card";
import BottomNavBar from './BottomNavBar';
import ConfirmationDialog from './ConfirmationDialog';
import GetInput from './GetInput';
//import { RiDeleteBin5Fill } from "react-icons/ri";

function Foreground() {
  const ref = useRef(null);
  const parseLists = (text) => {
    const lines = text.split('\n');
    return lines.map(line => {
      // Check for checkboxes
      const checkboxMatch = line.trim().match(/^-\s*\[([ x])\]\s*(.+)$/);
      if (checkboxMatch) {
        return { 
          type: 'checkbox', 
          content: checkboxMatch[2],
          checked: checkboxMatch[1] === 'x'
        };
      }
      // Check for bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return { type: 'bullet', content: line.trim().slice(2) };
      }
      // Check for numbered items
      const match = line.match(/^(\d+)\.\s+(.*)$/);
      if (match) {
        return { type: 'numbered', content: match[2], number: parseInt(match[1]) };
      }
      return { type: 'text', content: line };
    });
  };

  const initialCards = [
    {
      desc: "Create cards using the ➕ button, select one by clicking it. Edit using the pencil button.",
      lists: parseLists("Create cards using the ➕ button, select one by clicking it. Edit using the pencil button."),
      tags: ["creation"],
      close: false,
    },
    {
      desc: "Dynamically arrange cards anywhere on the screen, Download them as txt files.",
      lists: parseLists("Dynamically arrange cards anywhere on the screen, Download them as txt files."),
      tags: ["use tags"],
      close: false,
    }
  ];

  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [cardsData, setCardsData] = useState(() => {
    const savedCards = localStorage.getItem('cards');
    return savedCards ? JSON.parse(savedCards) : initialCards;
  });

  const [showInput, setShowInput] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  //const [newCardText, setNewCardText] = useState('');
  //const [newCardTags, setNewCardTags] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cardsData));
  }, [cardsData]);

  const addCard = () => {
      setShowInput(true);
      setEditingCardIndex(null);
  };

  const confirmCardCreation = (newDesc, newTag) => {
    if (newDesc.trim() !== '') {
      let newCardData;
      if (editingCardIndex === null) {
        newCardData = {
          desc: newDesc,
          lists: parseLists(newDesc),
          tags: newTag ? [newTag] : [],
          close: false,
        };
        setCardsData([...cardsData, newCardData]);
      } else {
        newCardData = cardsData[editingCardIndex];
        newCardData.desc = newDesc;
        newCardData.lists = parseLists(newDesc);
        newCardData.tags = newTag ? [newTag] : [];
        setCardsData(prev => prev.map((item, index) => 
          index === editingCardIndex ? newCardData : item
        ));
      }
      setShowInput(false);
    }
  };

 // const cancelCardCreation = () => {
   // resetState();
 // };

  // const resetState = () => {
  //   setShowInput(false);
  //   setShowConfirmation(false);
  //   setNewCardText('');
  // };

  const toggleCardSelection = (index, newDesc = null, newLists = null, isCheckboxUpdate = false) => {
    // Only toggle selection if it's not a checkbox update
    if (!isCheckboxUpdate) {
      if (selectedCardIndices.includes(index)) {
        setSelectedCardIndices(prev => prev.filter(i => i !== index));
      } else {
        setSelectedCardIndices(prev => [...prev, index]);
      }
    }

    // Update card data if needed
    if (newDesc || newLists) {
      setCardsData(prev => prev.map((item, idx) =>
        idx === index ? { 
          ...item, 
          desc: newDesc || item.desc,
          lists: newLists || item.lists
        } : item
      ));
    }
  };

  const deleteSelectedCards = () => {
    if (selectedCardIndices.length > 0) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDelete = () => {
    setCardsData(prev => prev.filter((_, index) => !selectedCardIndices.includes(index)));
    setSelectedCardIndices([]);
    setShowConfirmation(false);
  };

  return (
    <div ref={ref}className='fixed z-[3] top-0 left-0 w-full h-full bg-sky-800/10 flex gap-5 flex-wrap p-5'>
      {cardsData.map((item, index) => (
        <Card
          key={index}
          data={item}
          reference={ref}
          toggleCardSelection={toggleCardSelection}
          index={index}
          isSelected={selectedCardIndices.includes(index)}
          onEdit={() => {
            setShowInput(true);
            setEditingCardIndex(index);
          }}
        />
      ))}

      {/* Input Dialog */}
      {showInput && (
        <GetInput
          onClose={() => setShowInput(false)}
          onSubmit={(desc, tag) => confirmCardCreation(desc, tag)}
          initialText={editingCardIndex !== null ? cardsData[editingCardIndex].desc : ''}
          initialTag={editingCardIndex !== null ? cardsData[editingCardIndex].tags[0] : ''}
        />
      )}

      <BottomNavBar
        onAddClick={addCard}
        onDeleteClick={deleteSelectedCards}
        onCancelClick={() => setSelectedCardIndices([])}
        showCancel={selectedCardIndices.length > 0}
      />
      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {/* Add Button */}
      {/* <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <button
          onClick={addCard}
          className="text-3xl rounded-full w-16 h-16 bg-blue-500 text-white flex items-center justify-center"
        >
          +
        </button> */}
        
        {/* Delete Button */}
        {/* <button
          onClick={deleteSelectedCards}
          className={`text-xl rounded-full w-16 h-16 ${selectedCardIndices.length > 0 ? 'bg-red-800' : 'bg-gray-600'} text-white flex items-center justify-center cursor-pointer`}
        >
          <RiDeleteBin5Fill />
        </button>
      </div> */}

      {/* Cancel Button for Selected Cards */}
      {/* {selectedCardIndices.length > 0 && (
        <button
          onClick={() => setSelectedCardIndices([])}
          className="fixed bottom-20 left-20 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Cancel
        </button>
      )} */}
    </div>
  );
}

export default Foreground;