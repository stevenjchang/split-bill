import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import {
  NumberInput,
  Tag,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  IconButton,
  Checkbox,
  Text,
  TagRightIcon
} from "@chakra-ui/react";

import MyModal from "./MyModal";
import "./styles.css";
import ChangeNameModal from "./ChangeNameModal";

const tagColors = [
  // 'whiteAlpha',
  // 'blackAlpha',
  // 'gray',
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram"
];

// const colors2 = [
//   hex:
// ]

const initialPersons = [{ id: 1, name: 'Person 1' }, { id: 2, name: 'Person 2' }, { id: 3, name: 'Person 3' }, { id: 4, name: 'Person 4' }];

const initialReceipt = [
  {
    price: 1000,
    items: []
  },
  {
    price: 2000
  },
  {
    price: 2000
  },
  {
    price: 4000
  }
];

const InputGroup = ({ persons, foodItem, setPersons }) => {
  return (
    <>
      <div className="my-8">
        <MyModal />
        <NumberInput
          maxW="100px"
          size="sm"
          variant="filled"
          defaultValue={15}
          precision={2}
          step={1}
          min={0}
          _active={{ bg: "green.300" }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <div className="flex flex-wrap pl-2">
          {persons.map((p, i) => (
            <div key={i} className="persons-container my-2 flex items-center">
              <Checkbox key={i} className="mr-1" defaultChecked />
              {/* <Tag size="sm" key={i} idx={i} colorScheme={tagColors[i]}>
                {`Person ${i + 1}`}
              </Tag> */}
              <span className="text__person--name">{`Person ${i + 1}`}</span>
              <Text fontSize="xs" className="inline mx-1">
                pays
              </Text>

              <span className="text__price">$5</span>
            </div>
          ))}
        </div>
      </div>
      <Divider />
    </>
  );
};

const Calculator = () => {
  const [numberOfPersons, setNumberOfPersons] = useState(4);
  const [persons, setPersons] = useState(initialPersons);
  const [foodItems, setFood] = useState(initialReceipt);

  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

  const handleChange = (val) => {
    const newNum = Number(val);

    if (newNum < persons.length) {
      setPersons((prevState) => {
        const newState = prevState.slice(0, prevState.length - 1);
        return newState;
      });
    } else {
      setPersons((prevState) => {
        console.log("prevState", prevState);
        const newState = [...prevState, { id: val }];
        console.log("new", newState);
        return newState;
      });
    }

    setNumberOfPersons(newNum);
  };

  const handleNameChange = (idx, name) => {
    setPersons((prev) => {
      prev[idx].name = name;
      console.log("prev", prev);
      return prev;
    });
  };

  return (
    <section id="taxcalc-section" className="mx-auto">
      <h1>{JSON.stringify(persons, null, 4)}</h1>
      <div className="">
        <div className="flex flex-col items-center">
          <h2 className="my-4">How many people?</h2>
          <NumberInput
            size="md"
            maxW="70px"
            defaultValue={numberOfPersons}
            onChange={handleChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div id="badge-container" className="flex justify-center my-8">
          {persons.map((p, i) => {
            return (
              <ChangeNameModal idx={i} handleNameChange={handleNameChange} />
            );

            // return (
            //   <Tag key={i} colorScheme={tagColors[i]} onClick={onChange}>
            //     {`Person ${i + 1}`}
            //     <TagRightIcon boxSize="12px" as={GrEdit} />
            //   </Tag>
            // );
          })}
        </div>
      </div>

      <main>
        <div className="">
          <h1 className="text-center">shared items</h1>
          <hr />
          <br />
          <br />
          {foodItems.map((item, i) => (
            <InputGroup
              key={i}
              persons={persons}
              foodItem={item}
              setPersons={setPersons}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Calculator;
