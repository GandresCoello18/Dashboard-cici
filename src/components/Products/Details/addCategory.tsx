/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import { Select, MenuItem, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { SetStateAction, useContext, useEffect } from 'react';
import { Dispatch } from 'react';
import { useState } from 'react';
import { toast } from 'react-toast';
import { AddCategoryProduct, GetCategory } from '../../../api/category';
import { MeContext } from '../../../context/contextMe';
import { Category } from '../../../interfaces/Category';

interface Props {
  idProduct: string;
  setReloadProduct: Dispatch<SetStateAction<boolean>>;
}

export const AddCategory = ({ idProduct, setReloadProduct }: Props) => {
  const [Categorys, setCategorys] = useState<Category[]>([]);
  const [SelectCategorys, setSelectCategorys] = useState<number[]>([]);
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const FetchCategorys = async () => {
      try {
        const { categorys } = (await GetCategory({ token })).data;
        setCategorys(categorys);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    FetchCategorys();
  }, [token]);

  const SkeletonCategory = () => {
    return [0, 1, 2, 3, 4].map(item => (
      <Skeleton key={item} style={{ marginBottom: 5 }} variant='rect' width='90%' height={30} />
    ));
  };

  const findTitle = (idCategory: number) => {
    const findCategory = Categorys.find(cate => cate.idCategory === idCategory);
    if (findCategory) {
      return findCategory.titleCategory;
    }

    return '** NO ENCONTRADO **';
  };

  const saveAddCategory = async () => {
    setLoading(true);

    try {
      await AddCategoryProduct({ token, categorys: SelectCategorys, idProduct });
      setLoading(false);

      setSelectCategorys([]);
      toast.success('Se agrego las categorias');

      setReloadProduct(true);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {!Loading ? (
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          onChange={event => {
            const values = event.target.value as number;
            const isRepeat = SelectCategorys.find(item => item === values);
            if (!isRepeat) {
              setSelectCategorys([...SelectCategorys, values]);
            }
          }}
          style={{ width: '80%', marginBottom: 15 }}
        >
          {Categorys.map(cate => (
            <MenuItem key={cate.idCategory} value={cate.idCategory}>
              {cate.titleCategory}
            </MenuItem>
          ))}
        </Select>
      ) : (
        SkeletonCategory()
      )}

      <br />

      {SelectCategorys.length ? (
        <>
          <h4>Categorias seleccionadas</h4>
          <ul>
            {SelectCategorys.map(cate => (
              <li key={cate}>{findTitle(cate)}</li>
            ))}
          </ul>
          <br />
          <Button variant='contained' color='secondary' fullWidth onClick={saveAddCategory}>
            Guardar
          </Button>
        </>
      ) : (
        ''
      )}
    </>
  );
};
