import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Box,
} from '@chakra-ui/react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../Utils/Redux-Ts-Hooks/hooks';
import { showAlert } from '../../../Redux/Slices/General/Alert/alert.slice';
import { userAddMoneyAction } from '../../../Redux/Account/account.slice';
import { startModalLoading } from '../../../Redux/Slices/General/Load/modalLoad.slice';
import { stopLoading } from '../../../Redux/Slices/General/Load/load.slice';
import styles from './add-money.module.css';

const AddMoney: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profile } = useAppSelector((state) => state.profile);
  const { modalLoading } = useAppSelector((state) => state.modalLoader);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    amount: '',
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: any) => {
    try {
      dispatch(startModalLoading());
      e.preventDefault();
      const { amount } = formData;
      await new Promise((resolve) => setTimeout(resolve, 500));
      await dispatch(userAddMoneyAction({ amount }));
    } catch (error: any) {
      dispatch(stopLoading());
      if (error) {
        dispatch(showAlert());
        setErrorMessage('Sorry, but an error occured.');
        return;
      }
    }
  };

  const handleBlur = () => {
    let amountValue = Number(formData.amount);
    let newTransactionValue = amountValue.toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setFormData({ ...formData, amount: newTransactionValue });
  };
  const formattedBalance = Number(
    profile.UserAccount.balance,
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div onClick={onOpen} className={styles.cursor}>
        Fund Wallet
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Put some money in !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Current Balance</FormLabel>
              <Input
                value={formattedBalance}
                focusBorderColor="#F2D2BD"
                readOnly
                required
              />
            </FormControl>
            <FormControl />
            <br />
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                value={formData.amount}
                onBlur={handleBlur}
                focusBorderColor="#F2D2BD"
              >
                <NumberInputField
                  // type="number"
                  id="amount"
                  name="amount"
                  placeholder="$ amount"
                  onChange={handleInputChange}
                  required
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={modalLoading}
              loadingText="Loading"
              size="md"
              bg="#F2D2BD"
              onClick={handleFormSubmit}
            >
              Deposit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMoney;
