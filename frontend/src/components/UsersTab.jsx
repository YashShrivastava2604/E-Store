import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-hot-toast";

const UsersTab = () => {
    const { users, loading, fetchAllUsers, updateUserRole, user: currentUser } = useUserStore();

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleRoleChange = async (userId, newRole) => {
        if (currentUser._id === userId) {
            toast.error("You cannot change your own role.");
            return;
        }
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            await updateUserRole(userId, newRole);
        }
    };

    if (loading && users.length === 0) return <LoadingSpinner />;

    return (
        <div className='w-full'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-800'>User Management</h2>
            {users.length === 0 && !loading && <p className="text-gray-500">No users registered yet.</p>}
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Verification</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Seller Request</th>
                            <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className='hover:bg-gray-50'>
                                <td className='py-4 px-4 whitespace-nowrap font-medium text-gray-900'>{user.name}</td>
                                <td className='py-4 px-4 whitespace-nowrap text-gray-700'>{user.email}</td>
                                <td className='py-4 px-4 whitespace-nowrap capitalize text-gray-700'>{user.role}</td>
                                <td className='py-4 px-4 whitespace-nowrap'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </td>
                                <td className='py-4 px-4 whitespace-nowrap capitalize'>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.sellerRequestStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : user.sellerRequestStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.sellerRequestStatus}
                                    </span>
                                </td>
                                <td className='py-4 px-4 whitespace-nowrap'>
                                    {user.role !== 'admin' && (
                                        <div className='flex gap-2'>
                                            {user.sellerRequestStatus === 'pending' && user.role === 'user' && (
												<>
													<button onClick={() => handleRoleChange(user._id, 'seller')} className='bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm'>Approve</button>
													<button onClick={() => handleRoleChange(user._id, 'user')} className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm'>Reject</button>
												</>
                                            )}
											{user.role === 'seller' && (
												<button onClick={() => handleRoleChange(user._id, 'user')} className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm'>Demote to User</button>
											)}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTab;