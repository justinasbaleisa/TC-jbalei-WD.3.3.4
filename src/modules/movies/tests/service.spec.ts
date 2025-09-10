import type { MoviesRepository, MoviesService } from '../types'
import { createMoviesService } from '../service'
import { Movie, MovieInsert, MovieUpdate } from '../schema'

describe('MoviesService', () => {
  let mockedRepository: MoviesRepository
  let mockedService: MoviesService
  let movies: Movie[]

  beforeEach(() => {
    mockedRepository = {
      create: vi.fn(),
      getAll: vi.fn(),
      get: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
    mockedService = createMoviesService(mockedRepository)

    movies = [
      {
        id: 22,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: 4153,
        title: 'Inception',
        year: 2010,
      },
      {
        id: 234,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ]
  })

  const moviePatchTitle: MovieUpdate = { title: 'New Movie Title' }
  const moviePatchYear: MovieUpdate = { year: 2025 }
  const movieUpdate: MovieUpdate = { ...moviePatchTitle, ...moviePatchYear }
  const movieInsert: MovieInsert = { ...(movieUpdate as MovieInsert) }
  const movieSelect: Movie = { id: 10, ...movieInsert }

  describe('create: serviceCreateMovie()', () => {
    it('should create and return result', async () => {
      vi.mocked(mockedRepository.create).mockResolvedValue(movieSelect)

      const result = await mockedService.create(movieInsert)

      expect(mockedRepository.create).toHaveBeenCalledWith(movieInsert)
      expect(result).toEqual(movieSelect)
    })

    it('should return undefined if repository did', async () => {
      vi.mocked(mockedRepository.create).mockResolvedValue(undefined)

      const result = await mockedService.create(movieInsert)

      expect(mockedRepository.create).toHaveBeenCalledWith(movieInsert)
      expect(result).toEqual(undefined)
    })
  })

  describe('getAll: serviceGetAllMovies()', () => {
    it('should return all by default', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)

      const result = await mockedService.getAll()

      expect(mockedRepository.getAll).toHaveBeenCalledWith(
        /* limit = */ 0,
        /* offset = */ 0
      )
      expect(result).toEqual(movies)
    })

    it('should limit', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)

      await mockedService.getAll(1)

      expect(mockedRepository.getAll).toHaveBeenCalledWith(
        /* limit = */ 1,
        /* offset = */ 0
      )
    })

    it('should offset', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)

      await mockedService.getAll(0, 2)

      expect(mockedRepository.getAll).toHaveBeenCalledWith(
        /* limit = */ 0,
        /* offset = */ 2
      )
    })

    it('should limit & offset', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)

      await mockedService.getAll(3, 4)

      expect(mockedRepository.getAll).toHaveBeenCalledWith(
        /* limit = */ 3,
        /* offset = */ 4
      )
    })

    it('should sort', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue([...movies])

      const result = await mockedService.getAll()

      expect(mockedRepository.getAll).toHaveBeenCalledWith(
        /* limit = */ 0,
        /* offset = */ 0
      )

      expect(result).not.toEqual(movies)
      expect(result.map((m) => m.id)).toEqual([22, 234, 4153])
    })
  })

  describe('get: serviceGetMoviesByIds()', () => {
    it('should return array of all if no Ids provided', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)
      vi.mocked(mockedRepository.get)

      const result = await mockedService.get()

      expect(mockedRepository.getAll).toHaveBeenCalledWith()
      expect(mockedRepository.get).not.toHaveBeenCalled()

      expect(result).toEqual(movies)
    })

    it('should return array of ones with Ids provided', async () => {
      const movie = movies[1]
      vi.mocked(mockedRepository.getAll)
      vi.mocked(mockedRepository.get).mockResolvedValue([movie])

      const result = await mockedService.get([movie.id])

      expect(mockedRepository.getAll).not.toHaveBeenCalled()
      expect(mockedRepository.get).toHaveBeenCalledWith([movie.id])

      expect(result).toEqual([movie])
    })

    it('should return array of all if empty Ids array provided', async () => {
      vi.mocked(mockedRepository.getAll).mockResolvedValue(movies)
      vi.mocked(mockedRepository.get)

      const result = await mockedService.get([])

      expect(mockedRepository.getAll).toHaveBeenCalledWith()
      expect(mockedRepository.get).not.toHaveBeenCalled()

      expect(result).toEqual(movies)
    })
  })

  describe('update: serviceUpdateMovieById()', () => {
    it('should update and return result', async () => {
      vi.mocked(mockedRepository.update).mockResolvedValue(movieSelect)

      const result = await mockedService.update(movieSelect.id, movieUpdate)

      expect(mockedRepository.update).toHaveBeenCalledWith(
        movieSelect.id,
        movieUpdate
      )
      expect(result).toEqual(movieSelect)
    })

    it('should patch title and return result', async () => {
      vi.mocked(mockedRepository.update).mockResolvedValue(movieSelect)

      const result = await mockedService.update(movieSelect.id, moviePatchTitle)

      expect(mockedRepository.update).toHaveBeenCalledWith(
        movieSelect.id,
        moviePatchTitle
      )
      expect(result).toEqual(movieSelect)
    })

    it('should patch year and return result', async () => {
      vi.mocked(mockedRepository.update).mockResolvedValue(movieSelect)

      const result = await mockedService.update(movieSelect.id, moviePatchYear)

      expect(mockedRepository.update).toHaveBeenCalledWith(
        movieSelect.id,
        moviePatchYear
      )
      expect(result).toEqual(movieSelect)
    })

    it('should not update empty data and return unchanged', async () => {
      vi.mocked(mockedRepository.update).mockResolvedValue(movieSelect)

      const result = await mockedService.update(movieSelect.id, {})

      expect(mockedRepository.update).toHaveBeenCalledWith(movieSelect.id, {})
      expect(result).toEqual(movieSelect)
    })

    it('should return undefined if repository did', async () => {
      vi.mocked(mockedRepository.update).mockResolvedValue(undefined)

      const result = await mockedService.update(movieSelect.id, {})

      expect(mockedRepository.update).toHaveBeenCalledWith(movieSelect.id, {})
      expect(result).toEqual(undefined)
    })
  })

  describe('delete: serviceDeleteMovieById()', () => {
    it('should delete and return result', async () => {
      vi.mocked(mockedRepository.delete).mockResolvedValue(movieSelect)

      const result = await mockedService.delete(movieSelect.id)

      expect(mockedRepository.delete).toHaveBeenCalledWith(movieSelect.id)
      expect(result).toEqual(movieSelect)
    })

    it('should return undefined if repository did', async () => {
      vi.mocked(mockedRepository.delete).mockResolvedValue(undefined)

      const result = await mockedService.delete(movieSelect.id)

      expect(mockedRepository.delete).toHaveBeenCalledWith(movieSelect.id)
      expect(result).toEqual(undefined)
    })
  })
})
