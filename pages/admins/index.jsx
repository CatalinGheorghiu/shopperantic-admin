import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';
import { prettyDate } from '@/lib/date';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';

function AdminsPage({ swal }) {
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(ev) {
    ev.preventDefault();
    axios
      .post('/api/admins', { email })
      .then((res) => {
        swal.fire({
          title: 'Admin created!',
          icon: 'success'
        });
        setEmail('');
        loadAdmins();
      })
      .catch((err) => {
        swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error'
        });
      });
  }

  function deleteAdmin(_id, email) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete admin ${email}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          axios.delete('/api/admins?_id=' + _id).then(() => {
            swal.fire({
              title: 'Admin deleted!',
              icon: 'success'
            });
            loadAdmins();
          });
        }
      });
  }

  function loadAdmins() {
    setIsLoading(true);
    axios.get('/api/admins').then((res) => {
      setAdminEmails(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadAdmins();
  }, []);
  return (
    <Layout>
      <button onClick={() => router.back()}>
        <Icon iconName="arrow-back" color={'none'} />
      </button>

      <h2 className={'text-xl font-semibold'}>Admins</h2>

      <form onSubmit={addAdmin} className={'mt-4'}>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            className="mb-0 rounded-lg py-3 text-sm text-gray-900"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Add new admin"
          />

          <button
            type="submit"
            className="btn-primary min-w-[8rem] text-sm text-gray-900"
          >
            Add admin
          </button>
        </div>
      </form>

      <div className="flex flex-col md:mt-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4">
                      Created at
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={2}>
                        <div className="py-4">
                          <Spinner fullWidth={true} />
                        </div>
                      </td>
                    </tr>
                  )}
                  {adminEmails.length > 0 &&
                    adminEmails.map((adminEmail, index) => (
                      <tr
                        key={adminEmail + index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {adminEmail.email}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          {adminEmail.createdAt &&
                            prettyDate(adminEmail.createdAt)}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() =>
                              deleteAdmin(adminEmail._id, adminEmail.email)
                            }
                            className="min-w-[120px] rounded-md border bg-error px-4 py-2 text-white transition-all hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }) => <AdminsPage swal={swal} />);
