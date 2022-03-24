package rlog

import (
	"sync"
)

type Recorder struct {
	mu      *sync.RWMutex
	entries []Entry
}

func NewRecorder() *Recorder {
	return &Recorder{
		mu:      new(sync.RWMutex),
		entries: make([]Entry, 0),
	}
}

func (r *Recorder) AddEntry(entry Entry) {
	r.mu.Lock()
	r.entries = append([]Entry{entry}, r.entries...)
	r.mu.Unlock()
}

func (r *Recorder) GetEntries() []Entry {
	r.mu.RLock()
	defer r.mu.RUnlock()

	entries := make([]Entry, len(r.entries))
	copy(entries, r.entries)

	return entries
}

func (r *Recorder) GetEntriesWithoutDebug() []EntryWithoutDebug {
	r.mu.RLock()
	defer r.mu.RUnlock()

	entries := make([]EntryWithoutDebug, 0, len(r.entries))
	for _, entry := range r.entries {
		entries = append(entries, entry.EntryWithoutDebug)
	}

	return entries
}
