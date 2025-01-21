// import { useGuestStore } from '@/hooks/useGuestAccess';

// export const withAuth = (Component: React.ComponentType<any>) => {
//   return function AuthenticatedComponent(props: any) {
//     const isGuest = useGuestStore((state) => state.isGuest);

//     const handleRestrictedAction = () => {
//       if (isGuest) {
//         alert('로그인이 필요한 기능입니다.');
//         return false;
//       }
//       return true;
//     };

//     return <Component {...props} onRestrictedAction={handleRestrictedAction} />;
//   };
// }; 