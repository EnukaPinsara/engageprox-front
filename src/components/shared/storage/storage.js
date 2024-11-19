import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useCounterStore = create(
  persist(
    set => ({
      count: 0,
      increaseCount: () => set(state => ({ count: state.count + 1 })),
      decreaseCount: () => set(state => ({ count: state.count - 1 })),
      resetCount: () => set({ count: 0 })
    }),
    {
      name: 'counter-storage'
    }
  )
);

const useEventStore = create(
  persist(
    set => ({
      eventId: null,
      isParticipating: false,
      setEvent: (id, isParticipating = true) =>
        set({ eventId: id, isParticipating }),
      resetEvent: () => set({ eventId: null, isParticipating: false })
    }),
    {
      name: 'event-storage'
    }
  )
);

const useRoleStore = create(set => ({
  roles: [],
  fetchRoles: async () => {
    try {
      const response = await axios.get(`${baseUrl}/Role`);
      set({ roles: response.data });
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }
}));

const useEmployeeStore = create(set => ({
  employees: [],
  fetchEmployees: async () => {
    try {
      const response = await axios.get(`${baseUrl}/User`);
      set({ employees: response.data });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
}));

const useDesignationStore = create(set => ({
  designations: [],
  fetchDesignations: async () => {
    try {
      const response = await axios.get(`${baseUrl}/designations`);
      set({
        designations: response.data.filter(designation => designation.status)
      });
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  }
}));

const useDepartmentStore = create(set => ({
  departments: [],
  fetchDepartments: async () => {
    try {
      const response = await axios.get(`${baseUrl}/departments`);
      set({
        departments: response.data.filter(department => department.status)
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }
}));

const useBusinessUnitStore = create(set => ({
  businessUnits: [],
  fetchBusinessUnits: async () => {
    try {
      const response = await axios.get(`${baseUrl}/businessunits`);
      set({ businessUnits: response.data.filter(unit => unit.status) });
    } catch (error) {
      console.error('Error fetching business units:', error);
    }
  }
}));

const useEmployeeTypeStore = create(set => ({
  employeeTypes: [],
  fetchEmployeeTypes: async () => {
    try {
      const response = await axios.get(`${baseUrl}/employeetypes`);
      set({ employeeTypes: response.data.filter(type => type.status) });
    } catch (error) {
      console.error('Error fetching employee types:', error);
    }
  }
}));

const useAudienceStore = create(set => ({
  audiences: [],
  fetchAudiences: async () => {
    try {
      const response = await axios.get(`${baseUrl}/audience`);
      set({ audiences: response.data });
      console.log(response);
    } catch (error) {
      console.error('Error fetching audiences:', error);
    }
  }
}));

export {
  useCounterStore,
  useRoleStore,
  useEmployeeStore,
  useDesignationStore,
  useDepartmentStore,
  useBusinessUnitStore,
  useEmployeeTypeStore,
  useAudienceStore,
  useEventStore
};
